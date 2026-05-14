<template>
    <div ref="target" class="max-w-4xl mx-auto">
        <!-- YouTube Logo -->
        <div class="flex justify-center mb-8">
            <svg class="size-50" viewBox="0 0 159 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M154 17.5c-1.82-6.73-7.07-12-13.8-13.8C128.4 0 79.5 0 79.5 0S30.6 0 18.8 3.7C12.07 5.5 6.82 10.77 5 17.5 1.5 29.4 1.5 55 1.5 55s0 25.6 3.5 37.5c1.82 6.73 7.07 12 13.8 13.8 11.8 3.7 60.7 3.7 60.7 3.7s48.9 0 60.7-3.7c6.73-1.8 11.98-7.07 13.8-13.8 3.5-11.9 3.5-37.5 3.5-37.5s0-25.6-3.5-37.5z"
                    fill="#FF0000" />
                <path d="M64 78.77V31.23L104.5 55 64 78.77z" fill="#FFF" />
            </svg>
        </div>

        <!-- Subscriber Count -->
        <div class="text-center mb-8">
            <h2 class="text-5xl md:text-6xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                <span class="text-gray-600 dark:text-gray-400">{{ $t('number_subscribers') }} - </span>
                <span class="text-red-600">{{ formatNumber(animatedCount) }}K</span>
            </h2>
        </div>

        <!-- Thank You Message -->
        <p
            class="text-center text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {{ $t('thanks_for_support') }}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap justify-center gap-4">
            <a :href="channelLink" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 min-w-40">
                {{ $t('watch_video') }}
            </a>
            <NuxtLink to="/about-us"
                class="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200 min-w-40">
                {{ $t('about_us') }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

// Props
interface Props {
    channelUrl?: string
    subscriberCount?: number
    channelLink?: string
}

const props = withDefaults(defineProps<Props>(), {
    channelUrl: '@teachingfordevs',
    subscriberCount: 5420,
    channelLink: 'https://www.youtube.com/@teachingfordevs'
})

// Template ref for the component
const target = ref<HTMLElement | null>(null)

// Reactive state for animation
const animatedCount = ref<number>(0)
const hasAnimated = ref(false)

// Custom easing function - easeOutCubic
const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3)
}

// Function to animate the count
const animateCount = (targetValue: number) => {
    const duration = 2000
    const startValue = 0
    const startTime = performance.now()

    const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutCubic(progress)

        animatedCount.value = Math.round(startValue + (targetValue - startValue) * easedProgress)

        if (progress < 1) {
            requestAnimationFrame(animate)
        }
    }

    requestAnimationFrame(animate)
}

// Function to trigger the count animation
const startAnimation = () => {
    if (!hasAnimated.value) {
        hasAnimated.value = true
        animateCount(props.subscriberCount)
    }
}

// Use VueUse's useIntersectionObserver to detect visibility
useIntersectionObserver(
    target,
    ([entry]) => {
        // Trigger animation when component is 30% visible and hasn't animated yet
        if (entry && entry.isIntersecting) {
            startAnimation()
        }
    },
    {
        threshold: 0.3,
        immediate: true,
    }
)

// Fallback: Check if element is already visible on mount
onMounted(() => {
    // Small delay to ensure DOM is ready and intersection observer has initialized
    setTimeout(() => {
        if (target.value) {
            const rect = target.value.getBoundingClientRect()
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0
            if (isVisible) {
                startAnimation()
            }
        }
    }, 100)
})

// Format number with commas
const formatNumber = (num: number): string => {
    return Math.round(num).toLocaleString()
}
</script>
