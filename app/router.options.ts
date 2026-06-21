import type { RouterConfig } from '@nuxt/schema'

// Detect iOS Safari and webviews (Telegram, Facebook, etc.)
const isIOSWebView = () => {
    if (typeof window === 'undefined') return false
    const ua = window.navigator.userAgent
    const isIOS = /iPad|iPhone|iPod/.test(ua)
    const isWebView = /(FBAN|FBAV|Instagram|Line|Telegram)/.test(ua)
    return isIOS || isWebView
}

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        // Disable smooth scrolling in iOS Safari and webviews to prevent blank page issues
        const scrollBehavior = isIOSWebView() ? 'auto' : 'smooth'

        // If there's a saved position (back/forward navigation), use it
        if (savedPosition) {
            return savedPosition
        }

        // If navigating to a hash (e.g., #contact)
        if (to.hash) {
            return {
                el: to.hash,
                behavior: scrollBehavior,
                top: 80, // Offset for fixed header if any
            }
        }

        // Default: scroll to top for all route changes
        return {
            top: 0,
            behavior: scrollBehavior,
        }
    },
}
