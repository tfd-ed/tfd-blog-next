<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import type { Ref } from 'vue'

const { t } = useI18n()

useSeoMeta({
    title: 'Partner With TFDevs — Cambodia\'s Leading Tech Content Creator',
    description: 'Collaborate with TFDevs to reach Cambodia\'s growing technology community. Sponsorships, product reviews, tutorials, brand campaigns, and more.',
    ogTitle: 'Partner With TFDevs — Cambodia\'s Leading Tech Content Creator',
    ogDescription: 'Collaborate with TFDevs to reach Cambodia\'s growing technology community through high-quality technology content.',
    ogType: 'website',
    ogUrl: 'https://tfdevs.com/collaborate',
    ogSiteName: 'Teaching For Development',
    twitterCard: 'summary_large_image',
})

defineOgImage('BlogPost', {
    title: 'Partner With TFDevs',
    author: 'Teaching For Development',
})

// ─── Contact form ────────────────────────────────────────────────────────────
const form = ref({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
})
const isSubmitting = ref(false)
const submitted = ref(false)

const submitForm = async () => {
    isSubmitting.value = true
    await new Promise((resolve) => setTimeout(resolve, 1200))
    submitted.value = true
    isSubmitting.value = false
    form.value = { name: '', email: '', company: '', budget: '', message: '' }
    setTimeout(() => { submitted.value = false }, 8000)
}

// ─── Social platform stats with animated counts ──────────────────────────────
const statsSection = ref<HTMLElement | null>(null)
const hasAnimated = ref(false)

const platforms = [
    {
        name: 'YouTube',
        label: 'Subscribers',
        target: 44500,
        suffix: '',
        color: '#FF0000',
        link: 'https://www.youtube.com/@tfdevs',
        animated: ref(0),
    },
    {
        name: 'Facebook',
        label: 'Followers',
        target: 35000,
        suffix: '',
        color: '#1877F2',
        link: 'https://www.facebook.com/ChauDaraScienceEngineer',
        animated: ref(0),
    },
    {
        name: 'TikTok',
        label: 'Followers',
        target: 11000,
        suffix: '',
        color: '#010101',
        link: 'https://www.tiktok.com/@chaudarakh',
        animated: ref(0),
    },
    {
        name: 'Telegram Channel',
        label: 'Subscribers',
        target: 4500,
        suffix: '',
        color: '#24a2de',
        link: 'https://t.me/tfdTech',
        animated: ref(0),
    },
]

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

// Track animation frame IDs for cleanup
const animationFrameIds = ref<number[]>([])

const animateValue = (animatedRef: Ref<number>, target: number) => {
    const duration = 2000
    const startTime = performance.now()
    const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        animatedRef.value = Math.round(target * easeOutCubic(progress))
        if (progress < 1) {
            const frameId = requestAnimationFrame(tick)
            animationFrameIds.value.push(frameId)
        }
    }
    const frameId = requestAnimationFrame(tick)
    animationFrameIds.value.push(frameId)
}

const formatCount = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    return n.toLocaleString()
}

const ytPlatform = platforms[0]!
const fbPlatform = platforms[1]!
const ttPlatform = platforms[2]!
const telegramPlatform = platforms[3]!

useIntersectionObserver(
    statsSection,
    ([entry]) => {
        if (entry?.isIntersecting && !hasAnimated.value) {
            hasAnimated.value = true
            platforms.forEach(p => animateValue(p.animated, p.target))
        }
    },
    { threshold: 0.2 }
)

onMounted(() => {
    setTimeout(() => {
        if (statsSection.value) {
            const rect = statsSection.value.getBoundingClientRect()
            if (rect.top < window.innerHeight && rect.bottom > 0 && !hasAnimated.value) {
                hasAnimated.value = true
                platforms.forEach(p => animateValue(p.animated, p.target))
            }
        }
    }, 100)
})

// Cleanup animation frames on unmount to prevent iOS Safari/webview issues
onBeforeUnmount(() => {
    animationFrameIds.value.forEach(id => cancelAnimationFrame(id))
    animationFrameIds.value = []
})

// ─── Why partner reasons ──────────────────────────────────────────────────────
const whyReasons = computed(() => [
    { icon: 'i-lucide-trophy', title: t('collab.why_r1_title'), desc: t('collab.why_r1_desc') },
    { icon: 'i-lucide-users', title: t('collab.why_r2_title'), desc: t('collab.why_r2_desc') },
    { icon: 'i-lucide-map-pin', title: t('collab.why_r3_title'), desc: t('collab.why_r3_desc') },
    { icon: 'i-lucide-film', title: t('collab.why_r4_title'), desc: t('collab.why_r4_desc') },
    { icon: 'i-lucide-share-2', title: t('collab.why_r5_title'), desc: t('collab.why_r5_desc') },
    { icon: 'i-lucide-languages', title: t('collab.why_r6_title'), desc: t('collab.why_r6_desc') },
])

// ─── Partnership types ────────────────────────────────────────────────────────
const partnershipTypes = computed(() => [
    { icon: 'i-lucide-video', title: t('collab.type1_title'), desc: t('collab.type1_desc'), outcome: t('collab.type1_outcome') },
    { icon: 'i-lucide-package', title: t('collab.type2_title'), desc: t('collab.type2_desc'), outcome: t('collab.type2_outcome') },
    { icon: 'i-lucide-code-2', title: t('collab.type3_title'), desc: t('collab.type3_desc'), outcome: t('collab.type3_outcome') },
    { icon: 'i-lucide-cpu', title: t('collab.type4_title'), desc: t('collab.type4_desc'), outcome: t('collab.type4_outcome') },
    { icon: 'i-lucide-megaphone', title: t('collab.type5_title'), desc: t('collab.type5_desc'), outcome: t('collab.type5_outcome') },
    { icon: 'i-lucide-calendar', title: t('collab.type6_title'), desc: t('collab.type6_desc'), outcome: t('collab.type6_outcome') },
    { icon: 'i-lucide-smartphone', title: t('collab.type7_title'), desc: t('collab.type7_desc'), outcome: t('collab.type7_outcome') },
    { icon: 'i-lucide-book-open', title: t('collab.type8_title'), desc: t('collab.type8_desc'), outcome: t('collab.type8_outcome') },
])

// ─── Credibility points ───────────────────────────────────────────────────────
const credibilityPoints = computed(() => [
    { icon: 'i-lucide-shield-check', title: t('collab.cred1_title'), desc: t('collab.cred1_desc') },
    { icon: 'i-lucide-wrench', title: t('collab.cred2_title'), desc: t('collab.cred2_desc') },
    { icon: 'i-lucide-heart-handshake', title: t('collab.cred3_title'), desc: t('collab.cred3_desc') },
    { icon: 'i-lucide-map', title: t('collab.cred4_title'), desc: t('collab.cred4_desc') },
    { icon: 'i-lucide-star', title: t('collab.cred5_title'), desc: t('collab.cred5_desc') },
    { icon: 'i-lucide-trending-up', title: t('collab.cred6_title'), desc: t('collab.cred6_desc') },
])

// ─── Audience segments ────────────────────────────────────────────────────────
const audienceSegments = computed(() => [
    { icon: 'i-lucide-terminal', label: t('collab.seg_developers'), pct: '35%' },
    { icon: 'i-lucide-server', label: t('collab.seg_it_pros'), pct: '20%' },
    { icon: 'i-lucide-graduation-cap', label: t('collab.seg_students'), pct: '25%' },
    { icon: 'i-lucide-lightbulb', label: t('collab.seg_enthusiasts'), pct: '10%' },
    { icon: 'i-lucide-rocket', label: t('collab.seg_founders'), pct: '5%' },
    { icon: 'i-lucide-briefcase', label: t('collab.seg_decision_makers'), pct: '5%' },
])

// ─── Past collaborators ───────────────────────────────────────────────────────
const collaborators = [
    { name: 'Hostinger', logo: '/images/collabs/hostinger.png', url: 'https://web.facebook.com/share/v/1Yh8LR7Wtn' },
    { name: 'AIESEC in Cambodia', logo: '/images/collabs/aiesec.png', url: 'https://web.facebook.com/share/p/1EmYB78zEQ' },
    { name: 'Cryptomus', logo: '/images/collabs/cryptomus.png', url: 'https://youtu.be/6erO0E8m8Cc?si=F0l1c67mVlEfdf1N' },
    { name: 'GeeTest', logo: '/images/collabs/geetest.png', url: 'https://youtu.be/hKZncFPSXrw?si=shos3ySRZVrVDecw' },
    { name: 'Mazda Cambodia', logo: '/images/collabs/mazda.svg', url: 'https://www.facebook.com/share/v/1DoqkTbvGY/' },
    { name: 'Ultrahuman', logo: '/images/collabs/ultrahuman.png', url: 'https://www.facebook.com/share/v/1B8hoiBTdB/' },
    { name: 'vCloudia', logo: '/images/collabs/vcloudia.jpg', url: 'https://www.youtube.com/watch?v=qrfAWaibI8Y' },
    { name: 'WeduShare', logo: '/images/collabs/wedushare.png', url: 'https://youtu.be/oq8WlzSTgjA?si=6Bvf8QK0-vAezS58' },
    { name: 'CADT', logo: '/images/collabs/cadt.png', url: 'https://www.facebook.com/share/p/1CvdaoFEVL/' },
    { name: 'Python Cambodia', logo: '/images/collabs/python-cambodia.jpg', url: 'https://www.facebook.com/share/p/1DDN7pX6fb/' },
    { name: 'The U.S. Ambassador\'s Youth Council Cambodia', logo: '/images/collabs/the-us-ambassador-s-youth-council-cambodia.png', url: 'https://web.facebook.com/share/p/1BTMrG6T69/' },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
    {
        quote: 'Partnering with TFDevs gave our developer tools product instant credibility with Cambodia\'s tech community. The tutorial they created drove more sign-ups in one week than our previous month of ads.',
        author: 'Product Marketing Lead',
        company: 'Technology Partner A',
        initial: 'A',
    },
    {
        quote: 'The team at TFDevs delivered a product review that was both technically rigorous and genuinely engaging. Our hardware sold out in the region within days of the video going live.',
        author: 'Regional Sales Director',
        company: 'Hardware Partner B',
        initial: 'B',
    },
    {
        quote: 'What impressed us most was the authentic relationship TFDevs has with their audience. The engagement we received on our sponsored content exceeded every benchmark we had set.',
        author: 'Head of Partnerships',
        company: 'Software Partner C',
        initial: 'C',
    },
]

const budgetOptions = computed(() => [
    { label: t('collab.budget_under500'), value: 'under-500' },
    { label: t('collab.budget_500_1000'), value: '500-1000' },
    { label: t('collab.budget_1000_5000'), value: '1000-5000' },
    { label: t('collab.budget_5000plus'), value: '5000-plus' },
    { label: t('collab.budget_discuss'), value: 'discuss' },
])
</script>

<template>
    <div class="min-h-screen">

        <!-- ═══════════════════════════════════════════════════════════════════
             HERO
             ═══════════════════════════════════════════════════════════════════ -->
        <section class="relative py-12 transition-colors duration-300 overflow-hidden">
            <!-- Background layer — mask applied here, never touches content -->
            <div class="absolute inset-0 pointer-events-none"
                style="mask-image: radial-gradient(ellipse 90% 85% at 50% 50%, black 30%, transparent 75%); -webkit-mask-image: radial-gradient(ellipse 90% 85% at 50% 50%, black 30%, transparent 75%);">
                <!-- Bubble fill -->
                <div
                    class="absolute inset-0 bg-linear-to-br from-gray-100 via-white to-gray-50 dark:bg-linear-to-tl dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-950 transition-colors duration-300">
                </div>
                <!-- Blurred TFD orbs -->
                <div
                    class="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-tfd/10 dark:bg-tfd/15 blur-[100px]">
                </div>
                <div class="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-tfd/6 dark:bg-tfd/10 blur-[80px]">
                </div>
                <!-- Dot grid -->
                <div class="absolute inset-0 opacity-[0.04] dark:opacity-[0.05]">
                    <div
                        class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#000_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_30%_50%,white_1px,transparent_1px)] bg-size-[40px_40px]">
                    </div>
                </div>
            </div>

            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 text-center">
                <!-- Badge -->
                <div
                    class="inline-flex items-center gap-2 bg-tfd/15 border border-tfd/30 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium mb-6 text-tfd">
                    <UIcon name="i-lucide-globe" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {{ t('collab.badge') }}
                </div>

                <h1
                    class="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 max-w-4xl mx-auto text-gray-900 dark:text-white">
                    {{ t('collab.hero_title1') }}
                    <span class="text-tfd">{{ t('collab.hero_title_highlight') }}</span>
                    {{ t('collab.hero_title2') }}
                </h1>

                <p
                    class="text-base sm:text-xl text-gray-500 dark:text-neutral-400 max-w-3xl mx-auto mb-8 leading-relaxed">
                    {{ t('collab.hero_desc') }}
                </p>

                <div class="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="#contact"
                        class="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-tfd text-white font-semibold rounded-xl hover:bg-red-700 hover:shadow-2xl transition-all duration-200 shadow-lg text-sm sm:text-base">
                        <UIcon name="i-lucide-handshake" class="w-4 h-4 sm:w-5 sm:h-5" />
                        {{ t('collab.cta_work_with_us') }}
                    </a>
                    <a href="mailto:info@tfdevs.com"
                        class="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-transparent border-2 border-gray-300 dark:border-neutral-700 text-gray-600 dark:text-neutral-300 font-semibold rounded-xl hover:border-tfd hover:text-tfd dark:hover:text-white transition-all duration-200 text-sm sm:text-base">
                        <UIcon name="i-lucide-mail" class="w-4 h-4 sm:w-5 sm:h-5" />
                        {{ t('collab.cta_contact') }}
                    </a>
                </div>

                <!-- Trust indicators -->
                <div
                    class="mt-10 flex flex-wrap justify-center gap-4 sm:gap-8 text-gray-500 dark:text-neutral-400 text-xs sm:text-sm">
                    <span class="flex items-center gap-2">
                        <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-tfd" />
                        {{ t('collab.trust_transparent') }}
                    </span>
                    <span class="flex items-center gap-2">
                        <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-tfd" />
                        {{ t('collab.trust_expertise') }}
                    </span>
                    <span class="flex items-center gap-2">
                        <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-tfd" />
                        {{ t('collab.trust_authority') }}
                    </span>
                    <span class="flex items-center gap-2">
                        <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-tfd" />
                        {{ t('collab.trust_reach') }}
                    </span>
                </div>

                <!-- Animated collaborators marquee -->
                <div class="mt-16 relative">
                    <div
                        class="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <div class="flex w-max gap-8 sm:gap-12 animate-marquee-rtl">
                            <!-- First set -->
                            <div v-for="collab in collaborators" :key="`${collab.name}-1`"
                                class="shrink-0 grayscale opacity-40 dark:opacity-50 hover:opacity-70 hover:grayscale-0 transition-all duration-300">
                                <img :src="collab.logo" :alt="collab.name"
                                    class="h-12 sm:h-16 w-auto object-contain dark:brightness-[3] dark:invert" />
                            </div>

                            <!-- Duplicate set -->
                            <div v-for="collab in collaborators" :key="`${collab.name}-2`"
                                class="shrink-0 grayscale opacity-40 dark:opacity-50 hover:opacity-70 hover:grayscale-0 transition-all duration-300">
                                <img :src="collab.logo" :alt="collab.name"
                                    class="h-12 sm:h-16 w-auto object-contain dark:brightness-[3] dark:invert" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════════
             WHY PARTNER
             ═══════════════════════════════════════════════════════════════════ -->
        <section class="py-12 lg:py-20 bg-white dark:bg-neutral-950">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-10 lg:mb-14">
                    <p class="text-tfd font-semibold uppercase tracking-widest text-xs sm:text-sm mb-2">{{
                        t('collab.why_eyebrow')
                        }}</p>
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        {{ t('collab.why_title') }}
                    </h2>
                    <p class="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {{ t('collab.why_desc') }}
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="reason in whyReasons" :key="reason.title"
                        class="group relative bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-5 sm:p-7 hover:border-tfd/40 hover:shadow-xl transition-all duration-300">
                        <div
                            class="w-12 h-12 rounded-xl bg-tfd/10 dark:bg-tfd/20 flex items-center justify-center mb-5 group-hover:bg-tfd group-hover:text-white transition-all duration-300">
                            <UIcon :name="reason.icon"
                                class="w-6 h-6 text-tfd group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ reason.title }}</h3>
                        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ reason.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════════
             SOCIAL MEDIA REACH
             ═══════════════════════════════════════════════════════════════════ -->
        <section class="py-12 lg:py-20 bg-gray-50 dark:bg-neutral-900">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-10 lg:mb-14">
                    <p class="text-tfd font-semibold uppercase tracking-widest text-xs sm:text-sm mb-2">{{
                        t('collab.reach_eyebrow') }}</p>
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        {{ t('collab.reach_title') }}
                    </h2>
                    <p class="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {{ t('collab.reach_desc') }}
                    </p>
                </div>

                <div ref="statsSection" class="max-w-3xl mx-auto space-y-5">
                    <!-- YouTube -->
                    <a :href="ytPlatform.link" target="_blank" rel="noopener noreferrer"
                        class="flex items-center gap-4 bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-2xl px-4 sm:px-8 py-4 sm:py-6 hover:shadow-lg hover:border-red-200 dark:hover:border-red-900/50 transition-all duration-300 group">
                        <div class="shrink-0 w-12 h-12 flex items-center justify-center">
                            <svg viewBox="0 0 159 110" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M154 17.5c-1.82-6.73-7.07-12-13.8-13.8C128.4 0 79.5 0 79.5 0S30.6 0 18.8 3.7C12.07 5.5 6.82 10.77 5 17.5 1.5 29.4 1.5 55 1.5 55s0 25.6 3.5 37.5c1.82 6.73 7.07 12 13.8 13.8 11.8 3.7 60.7 3.7 60.7 3.7s48.9 0 60.7-3.7c6.73-1.8 11.98-7.07 13.8-13.8 3.5-11.9 3.5-37.5 3.5-37.5s0-25.6-3.5-37.5z"
                                    fill="#FF0000" />
                                <path d="M64 78.77V31.23L104.5 55 64 78.77z" fill="#FFF" />
                            </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold text-gray-900 dark:text-white">{{ ytPlatform.name }}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{{ t('collab.yt_subscribers') }}</div>
                        </div>
                        <div class="text-right shrink-0">
                            <div class="text-2xl sm:text-4xl font-bold text-red-600 tabular-nums">{{
                                formatCount(ytPlatform.animated.value) }}</div>
                        </div>
                        <UIcon name="i-lucide-arrow-up-right"
                            class="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-red-400 shrink-0 transition-colors" />
                    </a>

                    <!-- Facebook -->
                    <a :href="fbPlatform.link" target="_blank" rel="noopener noreferrer"
                        class="flex items-center gap-4 bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-2xl px-4 sm:px-8 py-4 sm:py-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300 group">
                        <div class="shrink-0 w-12 h-12 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" class="w-10 h-10" fill="#1877F2"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold text-gray-900 dark:text-white">{{ fbPlatform.name }}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{{ t('collab.fb_followers') }}</div>
                        </div>
                        <div class="text-right shrink-0">
                            <div class="text-2xl sm:text-4xl font-bold text-blue-600 tabular-nums">{{
                                formatCount(fbPlatform.animated.value) }}</div>
                        </div>
                        <UIcon name="i-lucide-arrow-up-right"
                            class="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-blue-400 shrink-0 transition-colors" />
                    </a>

                    <!-- TikTok -->
                    <a :href="ttPlatform.link" target="_blank" rel="noopener noreferrer"
                        class="flex items-center gap-4 bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-2xl px-4 sm:px-8 py-4 sm:py-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 group">
                        <div class="shrink-0 w-12 h-12 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" class="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"
                                    class="fill-[#010101] dark:fill-white" />
                                <path
                                    d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"
                                    fill="#EE1D52" opacity="0.4" />
                            </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold text-gray-900 dark:text-white">{{ ttPlatform.name }}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{{ t('collab.tt_followers') }}</div>
                        </div>
                        <div class="text-right shrink-0">
                            <div class="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white tabular-nums">{{
                                formatCount(ttPlatform.animated.value) }}</div>
                        </div>
                        <UIcon name="i-lucide-arrow-up-right"
                            class="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 shrink-0 transition-colors" />
                    </a>
                    <!-- Telegram -->
                    <a :href="telegramPlatform.link" target="_blank" rel="noopener noreferrer"
                        class="flex items-center gap-4 bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-2xl px-4 sm:px-8 py-4 sm:py-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 group">
                        <div class="shrink-0 w-12 h-12 flex items-center justify-center">
                            <!-- Telegram Logo -->
                            <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 240 240">
                                <defs>
                                    <linearGradient id="linear-gradient" x1="120" y1="240" x2="120"
                                        gradientUnits="userSpaceOnUse">
                                        <stop offset="0" stop-color="#1d93d2" />
                                        <stop offset="1" stop-color="#38b0e3" />
                                    </linearGradient>
                                </defs>
                                <title>Telegram_logo</title>
                                <circle cx="120" cy="120" r="120" fill="url(#linear-gradient)" />
                                <path
                                    d="M81.229,128.772l14.237,39.406s1.78,3.687,3.686,3.687,30.255-29.492,30.255-29.492l31.525-60.89L81.737,118.6Z"
                                    fill="#c8daea" />
                                <path d="M100.106,138.878l-2.733,29.046s-1.144,8.9,7.754,0,17.415-15.763,17.415-15.763"
                                    fill="#a9c6d8" />
                                <path
                                    d="M81.486,130.178,52.2,120.636s-3.5-1.42-2.373-4.64c.232-.664.7-1.229,2.1-2.2,6.489-4.523,120.106-45.36,120.106-45.36s3.208-1.081,5.1-.362a2.766,2.766,0,0,1,1.885,2.055,9.357,9.357,0,0,1,.254,2.585c-.009.752-.1,1.449-.169,2.542-.692,11.165-21.4,94.493-21.4,94.493s-1.239,4.876-5.678,5.043A8.13,8.13,0,0,1,146.1,172.5c-8.711-7.493-38.819-27.727-45.472-32.177a1.27,1.27,0,0,1-.546-.9c-.093-.469.417-1.05.417-1.05s52.426-46.6,53.821-51.492c.108-.379-.3-.566-.848-.4-3.482,1.281-63.844,39.4-70.506,43.607A3.21,3.21,0,0,1,81.486,130.178Z"
                                    fill="#fff" />
                            </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold text-gray-900 dark:text-white">{{ telegramPlatform.name }}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">{{ t('collab.yt_subscribers') }}</div>
                        </div>
                        <div class="text-right shrink-0">
                            <div class="text-2xl sm:text-4xl font-bold text-[#24a2de] dark:text-white tabular-nums">{{
                                formatCount(telegramPlatform.animated.value) }}</div>
                        </div>
                        <UIcon name="i-lucide-arrow-up-right"
                            class="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 shrink-0 transition-colors" />
                    </a>
                </div>

                <p class="text-center text-sm text-gray-400 dark:text-gray-500 mt-8 italic">
                    {{ t('collab.stats_note') }}
                </p>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════════
             PREVIOUS COLLABORATIONS
             ═══════════════════════════════════════════════════════════════════ -->
        <section class="relative py-12 lg:py-24 overflow-hidden bg-white">
            <!-- Blur gradient orbs -->
            <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                <div class="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-tfd/8 blur-[120px]">
                </div>
                <div class="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-red-400/10 blur-[100px]">
                </div>
                <div
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-orange-300/6 blur-[140px]">
                </div>
            </div>

            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="text-center mb-10 lg:mb-16">
                    <p class="text-tfd font-semibold uppercase tracking-widest text-xs sm:text-sm mb-3">{{
                        t('collab.partners_eyebrow') }}</p>
                    <h2 class="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        {{ t('collab.partners_title') }}
                    </h2>
                    <p class="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        {{ t('collab.partners_desc') }}
                    </p>
                    <!-- Decorative rule -->
                    <div class="mt-8 flex items-center justify-center gap-3">
                        <div class="h-px w-16 bg-linear-to-r from-transparent to-tfd/40"></div>
                        <div class="w-1.5 h-1.5 rounded-full bg-tfd/60"></div>
                        <div class="h-px w-16 bg-linear-to-l from-transparent to-tfd/40"></div>
                    </div>
                </div>

                <!-- Logo grid -->
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
                    <a v-for="collab in collaborators" :key="collab.name" :href="collab.url" target="_blank"
                        rel="noopener noreferrer"
                        class="group relative flex flex-col items-center justify-between gap-3 sm:gap-5 p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-gray-100 bg-white/70 backdrop-blur-sm hover:border-tfd/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        <!-- Card inner glow on hover -->
                        <div
                            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-tfd/5 to-transparent rounded-3xl pointer-events-none">
                        </div>
                        <!-- Logo -->
                        <div class="relative w-full h-14 sm:h-20 flex items-center justify-center">
                            <img :src="collab.logo" :alt="collab.name"
                                class="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <!-- Name -->
                        <span
                            class="text-xs font-semibold text-gray-400 group-hover:text-tfd text-center leading-snug transition-colors duration-200">
                            {{ collab.name }}
                        </span>
                        <!-- Corner accent -->
                        <div
                            class="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-tfd/0 group-hover:bg-tfd/50 transition-colors duration-300">
                        </div>
                    </a>
                </div>

                <!-- Bottom trust badge -->
                <div class="mt-8 lg:mt-16 flex justify-center">
                    <div
                        class="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-100 bg-white/80 backdrop-blur-sm text-sm text-gray-500 shadow-sm">
                        <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-tfd shrink-0" />
                        {{ t('collab.trust_transparent') }}
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════════
             PARTNERSHIP OPPORTUNITIES
             ═══════════════════════════════════════════════════════════════════ -->
        <section class="py-12 lg:py-20 bg-gray-50 dark:bg-neutral-900">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-10 lg:mb-14">
                    <p class="text-tfd font-semibold uppercase tracking-widest text-xs sm:text-sm mb-2">{{
                        t('collab.types_eyebrow') }}</p>
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        {{ t('collab.types_title') }}
                    </h2>
                    <p class="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {{ t('collab.types_desc') }}
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div v-for="type in partnershipTypes" :key="type.title"
                        class="group bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-2xl p-6 hover:border-tfd/50 hover:shadow-xl transition-all duration-300 flex flex-col">
                        <div
                            class="w-12 h-12 rounded-xl bg-tfd/10 dark:bg-tfd/15 flex items-center justify-center mb-4 group-hover:bg-tfd transition-all duration-300 shrink-0">
                            <UIcon :name="type.icon"
                                class="w-6 h-6 text-tfd group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ type.title }}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">{{
                            type.desc }}</p>
                        <div
                            class="mt-auto pt-4 border-t border-gray-100 dark:border-neutral-700 flex items-start gap-2">
                            <UIcon name="i-lucide-trending-up" class="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            <p class="text-xs text-gray-500 dark:text-gray-400">{{ type.outcome }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════════
             WHY BRANDS CHOOSE TFDEVS
             ═══════════════════════════════════════════════════════════════════ -->
        <section
            class="py-12 lg:py-20 bg-linear-to-br from-gray-900 via-neutral-900 to-tfd/20 dark:from-neutral-950 dark:via-neutral-900 dark:to-tfd/10 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-10 lg:mb-14">
                    <p class="text-yellow-400 font-semibold uppercase tracking-widest text-xs sm:text-sm mb-2">{{
                        t('collab.cred_eyebrow') }}</p>
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">{{ t('collab.cred_title') }}</h2>
                    <p class="text-base text-gray-300 max-w-2xl mx-auto">
                        {{ t('collab.cred_desc') }}
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="point in credibilityPoints" :key="point.title"
                        class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-7 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <div
                            class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-yellow-400/15 flex items-center justify-center mb-4">
                            <UIcon :name="point.icon" class="w-6 h-6 text-yellow-400" />
                        </div>
                        <h3 class="text-xl font-bold text-white mb-3">{{ point.title }}</h3>
                        <p class="text-gray-300 leading-relaxed text-sm">{{ point.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════════
             AUDIENCE PROFILE
             ═══════════════════════════════════════════════════════════════════ -->
        <section class="py-12 lg:py-20 bg-white dark:bg-neutral-950">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-10 lg:mb-14">
                    <p class="text-tfd font-semibold uppercase tracking-widest text-xs sm:text-sm mb-2">{{
                        t('collab.audience_eyebrow') }}</p>
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        {{ t('collab.audience_title') }}
                    </h2>
                    <p class="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {{ t('collab.audience_desc') }}
                    </p>
                </div>

                <!-- Segments grid -->
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10 lg:mb-14">
                    <div v-for="seg in audienceSegments" :key="seg.label"
                        class="bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-5 text-center hover:border-tfd/40 hover:shadow-md transition-all">
                        <div
                            class="w-10 h-10 rounded-xl bg-tfd/10 dark:bg-tfd/20 flex items-center justify-center mx-auto mb-3">
                            <UIcon :name="seg.icon" class="w-5 h-5 text-tfd" />
                        </div>
                        <div class="text-lg font-bold text-tfd mb-1">{{ seg.pct }}</div>
                        <div class="text-xs font-semibold text-gray-700 dark:text-gray-300">{{ seg.label }}</div>
                    </div>
                </div>

                <!-- Demographics placeholders -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div
                        class="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-7 border border-gray-100 dark:border-neutral-800">
                        <h4 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <UIcon name="i-lucide-bar-chart" class="w-5 h-5 text-tfd" />
                            {{ t('collab.demo_age_groups') }}
                        </h4>
                        <ul class="space-y-3">
                            <li v-for="ag in [['18–24', '45%'], ['25–34', '35%'], ['35–44', '15%'], ['45+', '5%']]"
                                :key="ag[0]" class="flex items-center justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">{{ ag[0] }}</span>
                                <div class="flex items-center gap-2">
                                    <div class="h-2 rounded-full bg-gray-200 dark:bg-neutral-700 w-24 overflow-hidden">
                                        <div class="h-full rounded-full bg-tfd" :style="`width: ${ag[1]}`"></div>
                                    </div>
                                    <span class="text-xs font-medium text-gray-700 dark:text-gray-300 w-8">{{
                                        ag[1] }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div
                        class="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-7 border border-gray-100 dark:border-neutral-800">
                        <h4 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-tfd" />
                            {{ t('collab.demo_locations') }}
                        </h4>
                        <ul class="space-y-3">
                            <li v-for="loc in [[t('collab.loc_phnom_penh'), '60%'], [t('collab.loc_provinces'), '25%'], [t('collab.loc_international'), '15%']]"
                                :key="loc[0]" class="flex items-center justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">{{ loc[0] }}</span>
                                <div class="flex items-center gap-2">
                                    <div class="h-2 rounded-full bg-gray-200 dark:bg-neutral-700 w-24 overflow-hidden">
                                        <div class="h-full rounded-full bg-tfd" :style="`width: ${loc[1]}`"></div>
                                    </div>
                                    <span class="text-xs font-medium text-gray-700 dark:text-gray-300 w-8">{{
                                        loc[1] }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div
                        class="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-7 border border-gray-100 dark:border-neutral-800">
                        <h4 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <UIcon name="i-lucide-heart" class="w-5 h-5 text-tfd" />
                            {{ t('collab.demo_interests') }}
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            <span
                                v-for="tag in ['Web Dev', 'AI/ML', 'Cloud', 'DevOps', 'Mobile', 'Cybersecurity', 'Hardware', 'Open Source']"
                                :key="tag"
                                class="px-3 py-1 text-xs font-medium bg-tfd/10 dark:bg-tfd/20 text-tfd rounded-full">
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!-- ═══════════════════════════════════════════════════════════════════
             FINAL CTA + CONTACT FORM
             ═══════════════════════════════════════════════════════════════════ -->
        <section id="contact" class="py-12 lg:py-20 bg-white dark:bg-neutral-950">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- CTA header -->
                <div class="text-center mb-10 lg:mb-14">
                    <p class="text-tfd font-semibold uppercase tracking-widest text-xs sm:text-sm mb-2">{{
                        t('collab.cta_eyebrow')
                        }}</p>
                    <h2
                        class="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 max-w-3xl mx-auto leading-tight">
                        {{ t('collab.cta_title') }}
                    </h2>
                    <p class="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {{ t('collab.cta_desc') }}
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
                    <!-- Contact info sidebar -->
                    <div class="lg:col-span-2 space-y-8">
                        <div>
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">{{
                                t('collab.direct_contact') }}</h3>
                            <div class="space-y-5">
                                <a href="mailto:info@tfdevs.com"
                                    class="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 hover:border-tfd/40 transition-colors group">
                                    <div
                                        class="w-10 h-10 rounded-lg bg-tfd/10 dark:bg-tfd/20 flex items-center justify-center shrink-0 group-hover:bg-tfd transition-all">
                                        <UIcon name="i-lucide-mail"
                                            class="w-5 h-5 text-tfd group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">Email</div>
                                        <div class="text-sm font-medium text-gray-900 dark:text-white">
                                            info@tfdevs.com
                                        </div>
                                    </div>
                                </a>
                                <a href="https://t.me/KevinKheang" target="_blank" rel="noopener noreferrer"
                                    class="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 hover:border-tfd/40 transition-colors group">
                                    <div
                                        class="w-10 h-10 rounded-lg bg-tfd/10 dark:bg-tfd/20 flex items-center justify-center shrink-0 group-hover:bg-tfd transition-all">
                                        <UIcon name="i-lucide-send"
                                            class="w-5 h-5 text-tfd group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">{{
                                            t('collab.telegram_label') }}</div>
                                        <div class="text-sm font-medium text-gray-900 dark:text-white">@KevinKheang
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <!-- <div class="bg-linear-to-br from-tfd to-red-700 rounded-2xl p-7 text-white">
                            <h4 class="font-bold text-lg mb-3">{{ t('collab.media_kit_title') }}</h4>
                            <p class="text-sm text-white/80 leading-relaxed mb-4">
                                {{ t('collab.media_kit_desc') }}
                            </p>
                            <a href="mailto:partnerships@tfdevs.com?subject=Media Kit Request"
                                class="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-tfd text-sm font-semibold rounded-lg hover:bg-yellow-50 transition-colors">
                                <UIcon name="i-lucide-download" class="w-4 h-4" />
                                {{ t('collab.media_kit_cta') }}
                            </a>
                        </div> -->
                    </div>

                    <!-- Form -->
                    <div class="lg:col-span-3">
                        <div
                            class="bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl p-8">
                            <!-- Success state -->
                            <div v-if="submitted" class="text-center py-10">
                                <div
                                    class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <UIcon name="i-lucide-check-circle" class="w-8 h-8 text-green-600" />
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{
                                    t('collab.success_title') }}</h3>
                                <p class="text-gray-600 dark:text-gray-400">
                                    {{ t('collab.success_desc') }}
                                </p>
                            </div>

                            <!-- Coming soon placeholder -->
                            <div v-else class="text-center py-10">
                                <div
                                    class="w-16 h-16 bg-tfd/10 dark:bg-tfd/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <UIcon name="i-lucide-construction" class="w-8 h-8 text-tfd" />
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{
                                    t('collab.direct_contact') }}</h3>
                                <p class="text-gray-600 dark:text-gray-400 mb-6">
                                    {{ t('collab.telegram_label') }}: <a href="https://t.me/KevinKheang" target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-tfd font-medium hover:underline">@KevinKheang</a>
                                    &nbsp;·&nbsp;
                                    Email: <a href="mailto:info@tfdevs.com"
                                        class="text-tfd font-medium hover:underline">info@tfdevs.com</a>
                                </p>
                            </div>

                            <!-- Form (temporarily disabled) -->
                            <form v-if="false" @submit.prevent="submitForm" class="space-y-5">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{
                                                t('collab.form_name_label') }} *</label>
                                        <UInput v-model="form.name" :placeholder="t('collab.form_name_placeholder')"
                                            required size="lg" class="w-full" />
                                    </div>
                                    <div>
                                        <label
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{
                                                t('collab.form_email_label') }} *</label>
                                        <UInput v-model="form.email" type="email"
                                            :placeholder="t('collab.form_email_placeholder')" required size="lg"
                                            class="w-full" />
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{
                                        t('collab.form_company_label') }} *</label>
                                    <UInput v-model="form.company" :placeholder="t('collab.form_company_placeholder')"
                                        required size="lg" class="w-full" />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{
                                        t('collab.form_budget_label') }}</label>
                                    <USelect v-model="form.budget" :items="budgetOptions" value-key="value"
                                        :placeholder="t('collab.form_budget_placeholder')" size="lg" class="w-full" />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{
                                        t('collab.form_message_label') }} *</label>
                                    <UTextarea v-model="form.message"
                                        :placeholder="t('collab.form_message_placeholder')" required :rows="5"
                                        class="w-full" />
                                </div>

                                <button type="submit" :disabled="isSubmitting"
                                    class="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-tfd hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                                    <UIcon v-if="isSubmitting" name="i-lucide-loader-circle"
                                        class="w-5 h-5 animate-spin" />
                                    <UIcon v-else name="i-lucide-send" class="w-5 h-5" />
                                    {{ isSubmitting ? t('collab.form_submitting') : t('collab.form_submit') }}
                                </button>

                                <p class="text-xs text-center text-gray-400 dark:text-gray-500">
                                    {{ t('collab.form_note') }}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<style scoped>
@keyframes marquee-rtl {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

.animate-marquee-rtl {
    animation: marquee-rtl 40s linear infinite;
}

.animate-marquee-rtl:hover {
    animation-play-state: paused;
}
</style>
