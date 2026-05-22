#!/usr/bin/env node
/**
 * Fetches the latest YouTube videos for the channel and writes them to
 * public/data/youtube-videos.json.
 *
 * Filters applied:
 *   1. Title contains '#short' (case-insensitive)
 *   2. Vertical aspect ratio (embedHeight > embedWidth) — catches Shorts
 *      that weren't tagged in the title.
 *
 * Run:  node scripts/fetch-youtube-videos.mjs
 * Env:  NUXT_YOUTUBE_API_KEY — YouTube Data API v3 key
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const CHANNEL_ID = 'UCJHZ__wUxS9lgTZHMxpMJcQ'
const FETCH_CANDIDATES = 20   // fetch more than needed to survive filtering
const MAX_VIDEOS = 6          // keep the N most recent non-short videos
const OUTPUT_PATH = join(__dirname, '..', 'server', 'assets', 'youtube-videos.json')

const apiKey = process.env.NUXT_YOUTUBE_API_KEY

if (!apiKey) {
    console.error('[fetch-youtube-videos] NUXT_YOUTUBE_API_KEY env var is not set')
    process.exit(1)
}

async function fetchJson(url) {
    const res = await fetch(url)
    if (!res.ok) {
        const body = await res.text()
        throw new Error(`HTTP ${res.status} from YouTube API: ${body}`)
    }
    return res.json()
}

async function main() {
    console.log('[fetch-youtube-videos] Fetching channel info...')

    // ── Step 1: resolve uploads playlist ID ───────────────────────
    const channelRes = await fetchJson(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${apiKey}`
    )
    const uploadsPlaylistId =
        channelRes.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
        console.error('[fetch-youtube-videos] Could not resolve uploads playlist — check CHANNEL_ID')
        process.exit(1)
    }

    // ── Step 2: fetch latest playlist items ───────────────────────
    console.log('[fetch-youtube-videos] Fetching playlist items...')
    const playlistRes = await fetchJson(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${FETCH_CANDIDATES}&key=${apiKey}`
    )

    // Filter 1 — drop by title
    const candidates = (playlistRes.items ?? []).filter(item => {
        const title = item.snippet?.title ?? ''
        return !title.toLowerCase().includes('#short')
    })

    if (candidates.length === 0) {
        console.warn('[fetch-youtube-videos] No candidates after title filter — writing empty array')
        persist([])
        return
    }

    // ── Step 3: fetch player dimensions to detect vertical videos ─
    console.log(`[fetch-youtube-videos] Checking dimensions for ${candidates.length} candidates...`)
    const videoIds = candidates.map(i => i.snippet.resourceId.videoId).join(',')
    const detailsRes = await fetchJson(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,player&id=${videoIds}&key=${apiKey}`
    )

    const isVertical = new Map(
        detailsRes.items.map(v => [
            v.id,
            parseInt(v.player.embedHeight, 10) > parseInt(v.player.embedWidth, 10),
        ])
    )

    // Filter 2 — drop vertical (Shorts) videos
    const videos = candidates
        .filter(item => !isVertical.get(item.snippet.resourceId.videoId))
        .slice(0, MAX_VIDEOS)
        .map(item => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            publishedAt: item.snippet.publishedAt,
        }))

    persist(videos)
}

function persist(videos) {
    mkdirSync(dirname(OUTPUT_PATH), { recursive: true })
    writeFileSync(OUTPUT_PATH, JSON.stringify(videos, null, 2))
    console.log(`[fetch-youtube-videos] Saved ${videos.length} video(s) → ${OUTPUT_PATH}`)
}

main().catch(err => {
    console.error('[fetch-youtube-videos] Fatal:', err)
    process.exit(1)
})
