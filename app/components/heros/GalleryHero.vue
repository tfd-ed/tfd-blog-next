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
            <!-- Tile grid — doubled so translateX(-50%) loops seamlessly -->
            <div class="absolute top-0 left-0 flex flex-wrap gap-3 p-4 gallery-drift" :style="{ width: '280vw' }">
                <div v-for="(image, index) in tiledImages" :key="index"
                    class="shrink-0 rounded-2xl overflow-hidden shadow-xl" :style="{
                        transform: `rotate(${tileConfigs[index % tileConfigs.length].rotation}deg)`,
                        width: tileConfigs[index % tileConfigs.length].w,
                        height: tileConfigs[index % tileConfigs.length].h,
                    }">
                    <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover" loading="lazy" />
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
            <!-- Quote icon -->
            <div class="flex justify-center">
                <div class="w-11 h-11 flex items-center justify-center bg-white/15 backdrop-blur-sm rounded-xl">
                    <svg class="w-5 h-5 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
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

            <!-- CTA Buttons -->
            <div v-if="showCTA" class="flex flex-wrap gap-3 pt-2 justify-center">
                <NuxtLink to="/articles"
                    class="px-6 py-3 bg-tfd hover:bg-tfd/85 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm">
                    {{ $t('read_articles') }}
                </NuxtLink>
                <NuxtLink to="/about-us"
                    class="px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-medium rounded-xl transition-all duration-300 border border-white/25 hover:border-white/50 backdrop-blur-sm hover:-translate-y-0.5">
                    {{ $t('about_us') }}
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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
    showCTA: { type: Boolean, default: true }
})

/**
 * Tile configuration: predefined size + rotation combos.
 * Kept to ~8 entries so the pattern isn't obviously repetitive.
 */
const tileConfigs = [
    { w: '160px', h: '120px', rotation: -3 },
    { w: '130px', h: '160px', rotation: 2 },
    { w: '190px', h: '130px', rotation: -1.5 },
    { w: '145px', h: '145px', rotation: 3.5 },
    { w: '170px', h: '110px', rotation: -4 },
    { w: '120px', h: '155px', rotation: 1.5 },
    { w: '200px', h: '140px', rotation: -2.5 },
    { w: '150px', h: '175px', rotation: 4 },
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
 * Repeat the shuffled image array until we have enough tiles.
 * The first half and second half are independently shuffled so the
 * seamless-loop seam doesn't create an obvious repeated block.
 */
const MIN_TILES = 112
const tiledImages = computed<Image[]>(() => {
    if (!props.images.length) return []
    const half = MIN_TILES / 2
    const fillHalf = (target: number): Image[] => {
        const result: Image[] = []
        while (result.length < target) {
            result.push(...shuffle(props.images))
        }
        return result.slice(0, target)
    }
    return [...fillHalf(half), ...fillHalf(half)]
})
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
    animation: gallery-drift 160s linear infinite;
    will-change: transform;
}
</style>
