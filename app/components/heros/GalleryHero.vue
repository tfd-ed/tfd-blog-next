<template>
    <section class="relative overflow-hidden h-130 md:h-150 flex items-center">
        <!-- ── Mosaic Background ─────────────────────────────────── -->
        <!--
            mask-image fades only this background layer into the page background (white / neutral-900)
            at top & bottom — the hero text is in a sibling z-10 element so it is never masked.
        -->
        <div class="absolute inset-0" style="
                -webkit-mask-image: linear-gradient(to bottom,
                    transparent 0%,
                    rgba(0,0,0,0.15) 6%,
                    rgba(0,0,0,0.5)  12%,
                    rgba(0,0,0,0.85) 20%,
                    black            30%,
                    black            70%,
                    rgba(0,0,0,0.85) 80%,
                    rgba(0,0,0,0.5)  88%,
                    rgba(0,0,0,0.15) 94%,
                    transparent      100%
                );
                        mask-image: linear-gradient(to bottom,
                    transparent 0%,
                    rgba(0,0,0,0.15) 6%,
                    rgba(0,0,0,0.5)  12%,
                    rgba(0,0,0,0.85) 20%,
                    black            30%,
                    black            70%,
                    rgba(0,0,0,0.85) 80%,
                    rgba(0,0,0,0.5)  88%,
                    rgba(0,0,0,0.15) 94%,
                    transparent      100%
                );
            ">
            <!-- 2-row tile grid — each row loops seamlessly on its own width -->
            <div class="absolute inset-0 flex flex-col gap-4 justify-center py-6">
                <!-- Row 1 -->
                <div class="flex gap-4 gallery-drift" style="width: max-content">
                    <div v-for="(tile, index) in row1Tiles" :key="`r1-${index}`"
                        class="shrink-0 rounded-2xl overflow-hidden shadow-xl bg-gray-300 dark:bg-gray-700" :style="{
                            transform: `rotate(${tile.config.rotation}deg)`,
                            width: tile.config.w,
                            height: tile.config.h,
                        }">
                        <NuxtImg provider="cloudflare" :src="tile.image.src" :alt="tile.image.alt"
                            class="w-full h-full object-cover transition-opacity duration-500"
                            :class="loadedImages.has(tile.image.src) ? 'opacity-100' : 'opacity-0'" loading="eager"
                            fetchpriority="high" @load="onImageLoad(tile.image.src)" />
                    </div>
                </div>
                <!-- Row 2 -->
                <div class="flex gap-4 gallery-drift" style="width: max-content">
                    <div v-for="(tile, index) in row2Tiles" :key="`r2-${index}`"
                        class="shrink-0 rounded-2xl overflow-hidden shadow-xl bg-gray-300 dark:bg-gray-700" :style="{
                            transform: `rotate(${tile.config.rotation}deg)`,
                            width: tile.config.w,
                            height: tile.config.h,
                        }">
                        <img :src="tile.image.src" :alt="tile.image.alt"
                            class="w-full h-full object-cover transition-opacity duration-500"
                            :class="loadedImages.has(tile.image.src) ? 'opacity-100' : 'opacity-0'" loading="eager"
                            fetchpriority="high" @load="onImageLoad(tile.image.src)" />
                    </div>
                </div>
            </div>

            <!-- Flat overlay: lighter on light mode so images breathe, heavier on dark -->
            <div class="absolute inset-0 bg-black/30 dark:bg-black/65" />
            <!-- Vignette — light mode: very subtle; dark mode: stronger -->
            <div class="absolute inset-0 dark:hidden
                bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.28)_100%)]" />
            <div class="absolute inset-0 hidden dark:block
                bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.65)_100%)]" />
        </div>

        <!-- ── Hero Text ─────────────────────────────────────────── -->
        <div class="relative z-10 w-full container mx-auto px-6 text-center space-y-5">
            <!-- YouTube Stats + Stacked Buttons (above title) -->
            <div v-if="showCTA" ref="ytWidget" class="flex items-center justify-center gap-3 flex-wrap">
                <!-- YouTube icon + subscriber count -->
                <div
                    class="flex flex-col items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-2.5 border border-white/15">
                    <svg class="w-14 h-9 shrink-0" viewBox="0 0 159 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M154 17.5c-1.82-6.73-7.07-12-13.8-13.8C128.4 0 79.5 0 79.5 0S30.6 0 18.8 3.7C12.07 5.5 6.82 10.77 5 17.5 1.5 29.4 1.5 55 1.5 55s0 25.6 3.5 37.5c1.82 6.73 7.07 12 13.8 13.8 11.8 3.7 60.7 3.7 60.7 3.7s48.9 0 60.7-3.7c6.73-1.8 11.98-7.07 13.8-13.8 3.5-11.9 3.5-37.5 3.5-37.5s0-25.6-3.5-37.5z"
                            fill="#FF0000" />
                        <path d="M64 78.77V31.23L104.5 55 64 78.77z" fill="#FFF" />
                    </svg>
                    <div class="text-center leading-none">
                        <span class="text-white font-bold text-lg [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]">{{
                            animatedCount }}K</span>
                        <div class="text-white/60 text-xs mt-0.5">{{ $t('number_subscribers') }}</div>
                    </div>
                </div>

                <!-- Divider -->
                <div class="hidden sm:block w-px h-12 bg-white/25"></div>

                <!-- Stacked buttons -->
                <div class="flex flex-col gap-1.5">
                    <a :href="channelLink" target="_blank" rel="noopener noreferrer"
                        class="h-9 px-5 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all duration-300 text-sm shadow-lg hover:-translate-y-0.5">
                        {{ $t('watch_video') }}
                    </a>
                    <NuxtLink to="/about-us"
                        class="h-9 px-5 flex items-center justify-center bg-white/15 hover:bg-white/25 text-white font-medium rounded-xl transition-all duration-300 border border-white/25 hover:border-white/50 backdrop-blur-sm text-sm hover:-translate-y-0.5">
                        {{ $t('about_us') }}
                    </NuxtLink>
                </div>
            </div>

            <!-- Title -->
            <h1
                class="text-3xl md:text-4xl lg:text-5xl font-bold italic text-white leading-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.8),0_1px_3px_rgba(0,0,0,0.9)] max-w-3xl mx-auto">
                {{ title }}
            </h1>

            <!-- Description -->
            <p
                class="text-base md:text-lg text-white leading-relaxed max-w-2xl mx-auto [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
                {{ description }}
            </p>

            <!-- Author -->
            <div v-if="author" class="pt-4 inline-flex flex-col items-center border-t border-white/40">
                <a href="https://github.com/KimangKhenng" target="_blank" rel="noopener noreferrer"
                    class="group inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-white/80 transition-colors underline decoration-white/50 hover:decoration-white underline-offset-2 [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]">
                    {{ author }}
                    <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
                <p v-if="authorTitle" class="text-xs text-white/80 mt-0.5 [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]">{{
                    authorTitle }}</p>
            </div>


        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

interface Image {
    src: string
    alt: string
}

const props = defineProps({
    title: { type: String, default: 'Empowering Education Through Innovation' },
    description: { type: String, default: '' },
    author: { type: String, default: '' },
    authorTitle: { type: String, default: '' },
    images: { type: Array as () => Image[], default: () => [] },
    showCTA: { type: Boolean, default: true },
    subscriberCount: { type: Number, default: 44 },
    channelLink: { type: String, default: 'https://www.youtube.com/@tfdevs' },
})

// Track which unique srcs have finished loading so tiles fade in cleanly
const loadedImages = ref(new Set<string>())
function onImageLoad(src: string) {
    loadedImages.value = new Set(loadedImages.value).add(src)
}

// Animated subscriber count
const ytWidget = ref<HTMLElement | null>(null)
const animatedCount = ref(0)
const hasAnimated = ref(false)

function animateCount(target: number) {
    const duration = 2000
    const start = performance.now()
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        animatedCount.value = Math.round(target * easeOut(progress))
        if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
}

useIntersectionObserver(ytWidget, ([entry]) => {
    if (entry?.isIntersecting && !hasAnimated.value) {
        hasAnimated.value = true
        animateCount(props.subscriberCount)
    }
}, { threshold: 0.3 })

onMounted(() => {
    // Populate tiles client-side only to avoid SSR/hydration mismatch from Math.random()
    if (props.images.length) {
        const half1a = spreadFill(props.images, HALF)
        const half1b = spreadFill(props.images, HALF)
        row1Tiles.value = [...half1a, ...half1b]
        const half2a = spreadFill(props.images, HALF)
        const half2b = spreadFill(props.images, HALF)
        row2Tiles.value = [...half2a, ...half2b]
    }

    if (ytWidget.value) {
        const rect = ytWidget.value.getBoundingClientRect()
        if (rect.top < window.innerHeight && !hasAnimated.value) {
            hasAnimated.value = true
            animateCount(props.subscriberCount)
        }
    }
})

/**
 * Tile configuration: predefined size + rotation combos.
 * Kept to ~8 entries so the pattern isn't obviously repetitive.
 */
const tileConfigs = [
    { w: '250px', h: '200px', rotation: -3 },
    { w: '270px', h: '185px', rotation: 2 },
    { w: '290px', h: '215px', rotation: -1.5 },
    { w: '235px', h: '205px', rotation: 3.5 },
    { w: '260px', h: '190px', rotation: -4 },
    { w: '240px', h: '220px', rotation: 1.5 },
    { w: '280px', h: '200px', rotation: -2.5 },
    { w: '255px', h: '210px', rotation: 4 },
]

/**
 * Fisher-Yates shuffle — returns a new shuffled copy of the array.
 */
function shuffle<T>(arr: T[]): T[] {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

/**
 * Spread-fill: place `count` tiles by drawing from the image pool such
 * that the same image never appears within `window` positions of itself.
 * Each tile also gets an independently randomised config so the same
 * photo never looks identical when it repeats.
 */
function spreadFill(images: Image[], count: number): { image: Image; config: typeof tileConfigs[number] }[] {
    const WINDOW = Math.min(Math.floor(images.length * 0.6), 12)
    const configs = shuffle([...tileConfigs, ...tileConfigs]) // double pool for more variety
    const result: { image: Image; config: typeof tileConfigs[number] }[] = []
    const recent: string[] = []

    // build a large shuffled supply to draw from
    let supply: Image[] = []
    while (supply.length < count * 2) supply.push(...shuffle(images))

    let supplyIdx = 0
    while (result.length < count) {
        // scan supply for an image not in the recent window
        let picked: Image | null = null
        for (let attempt = 0; attempt < supply.length - supplyIdx; attempt++) {
            const candidate = supply[supplyIdx + attempt]
            if (!recent.includes(candidate.src)) {
                picked = candidate
                supply.splice(supplyIdx + attempt, 1) // remove so it isn't reused immediately
                break
            }
        }
        if (!picked) {
            // fallback: just take next (shouldn't happen with enough supply)
            picked = supply[supplyIdx++]
        }

        result.push({
            image: picked,
            config: configs[result.length % configs.length]
        })

        recent.push(picked.src)
        if (recent.length > WINDOW) recent.shift()
    }
    return result
}

// 40 unique tiles per half-row; duplicate each half so translateX(-50%) loops perfectly
const HALF = 40
// Tiles are populated only on the client (onMounted) to avoid SSR/hydration mismatch
// caused by Math.random() producing different shuffle results on server vs client.
type Tile = { image: Image; config: typeof tileConfigs[number] }
const row1Tiles = ref<Tile[]>([])
const row2Tiles = ref<Tile[]>([])
</script>

<style scoped>
@keyframes gallery-drift {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

.gallery-drift {
    animation: gallery-drift 480s linear infinite;
    will-change: transform;
}
</style>
