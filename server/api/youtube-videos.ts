interface YoutubeVideo {
    id: string
    title: string
    description: string
    publishedAt: string
}

interface ChannelRes {
    items: { contentDetails: { relatedPlaylists: { uploads: string } } }[]
}

interface PlaylistRes {
    items: {
        snippet: {
            resourceId: { videoId: string }
            title: string
            description: string
            publishedAt: string
        }
    }[]
}

interface VideoDetailsRes {
    items: {
        id: string
        contentDetails: { duration: string }
        player: { embedWidth: string; embedHeight: string }
    }[]
}

import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event): Promise<YoutubeVideo[]> => {
    // Prevent Cloudflare and other CDNs from caching API responses
    setResponseHeaders(event, {
        'Cache-Control': 'no-store',
    })

    // useRuntimeConfig(event) reads from runtimeConfig in nuxt.config
    // which resolves process.env.YOUTUBE_API_KEY — populated by CF Workers
    // via nodejs_compat when the secret is set in Cloudflare dashboard
    console.log('[youtube-videos] Handling request, reading API key from config...')
    const config = useRuntimeConfig(event)
    const apiKey: string = config.youtubeApiKey || process.env.NUXT_YOUTUBE_API_KEY || ''
    const channelId = 'UCJHZ__wUxS9lgTZHMxpMJcQ'

    if (!apiKey) {
        console.warn('[youtube-videos] No API key provided for YouTube API')
        console.log('[youtube-videos] YOUTUBE_API_KEY is not set')
        return []
    }

    try {
        console.log('[youtube-videos] Fetching videos from YouTube API...')
        const channelRes = await $fetch<ChannelRes>(
            `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
        )
        const uploadsPlaylistId: string | undefined =
            channelRes.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

        if (!uploadsPlaylistId) return []

        // Fetch more items upfront so we have enough after filtering Shorts
        const playlistRes = await $fetch<PlaylistRes>(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=15&key=${apiKey}`
        )

        const candidates = playlistRes.items ?? []
        const videoIds = candidates.map(i => i.snippet.resourceId.videoId).join(',')

        // Fetch duration + player dimensions to detect Shorts (vertical = 9:16)
        const detailsRes = await $fetch<VideoDetailsRes>(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,player&id=${videoIds}&key=${apiKey}`
        )

        const isShort = new Map(
            detailsRes.items.map(v => [
                v.id,
                parseInt(v.player.embedHeight) > parseInt(v.player.embedWidth)
            ])
        )

        // Exclude Shorts (vertical aspect ratio), take first 3
        return candidates
            .filter(item => !isShort.get(item.snippet.resourceId.videoId))
            .slice(0, 3)
            .map(item => ({
                id: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                publishedAt: item.snippet.publishedAt,
            }))
    } catch (err) {
        console.error('[youtube-videos] Failed to fetch videos:', err)
        return []
    }
})