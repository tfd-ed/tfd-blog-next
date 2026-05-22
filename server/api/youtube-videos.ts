export default defineEventHandler(async (event) => {
    // Prevent CDN / Cloudflare from caching this response
    setResponseHeaders(event, {
        'Cache-Control': 'no-store',
    })

    try {
        const storage = useStorage('assets:server')
        const videos = await storage.getItem<any[]>('youtube-videos.json')
        return (videos ?? []).slice(0, 3)
    } catch (err) {
        console.error('[youtube-videos] Failed to read pre-generated JSON:', err)
        return []
    }
})