export default defineEventHandler((event) => {
    const config = useRuntimeConfig(event)
    return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        services: {
            youtube: !!(config.youtubeApiKey || process.env.YOUTUBE_API_KEY),
        },
    }
})
