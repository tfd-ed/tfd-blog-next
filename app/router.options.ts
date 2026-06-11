import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        // If there's a saved position (back/forward navigation), use it
        if (savedPosition) {
            return savedPosition
        }

        // If navigating to a hash (e.g., #contact)
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
                top: 80, // Offset for fixed header if any
            }
        }

        // Default: scroll to top for all route changes
        return {
            top: 0,
            behavior: 'smooth',
        }
    },
}
