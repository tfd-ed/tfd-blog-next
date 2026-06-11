<template>
    <!-- Outer wrapper: no background, just spacing -->
    <section class="relative py-6 transition-colors duration-300">

        <!-- Background layer only — mask applied here, never touches content -->
        <div class="absolute inset-0 pointer-events-none"
            style="mask-image: radial-gradient(ellipse 90% 85% at 50% 50%, black 30%, transparent 75%); -webkit-mask-image: radial-gradient(ellipse 90% 85% at 50% 50%, black 30%, transparent 75%);">
            <!-- Bubble fill -->
            <div
                class="absolute inset-0 bg-linear-to-br from-gray-100 via-white to-gray-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-colors duration-300">
            </div>
            <!-- Blurred TFD orbs -->
            <div
                class="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-tfd/10 dark:bg-tfd/15 blur-[100px]">
            </div>
            <div class="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-tfd/6 dark:bg-tfd/10 blur-[80px]"></div>
            <!-- Dot grid -->
            <div class="absolute inset-0 opacity-[0.04] dark:opacity-[0.05]">
                <div
                    class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#000_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_30%_50%,white_1px,transparent_1px)] bg-size-[40px_40px]">
                </div>
            </div>
        </div>

        <!-- Content layer — sits above the masked background, fully opaque -->
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div class="flex flex-col lg:flex-row items-center justify-between gap-10">

                <!-- Left: text content -->
                <div class="text-gray-900 dark:text-white text-center lg:text-left max-w-2xl">
                    <!-- Eyebrow -->
                    <div
                        class="inline-flex items-center gap-2 bg-tfd/15 border border-tfd/30 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest mb-5 text-tfd">
                        <UIcon name="i-lucide-handshake" class="w-3.5 h-3.5" />
                        {{ $t('collab.partners_eyebrow') }}
                    </div>

                    <h2
                        class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-gray-900 dark:text-white">
                        {{ $t('collab.banner_title_1') }}
                        <span class="text-tfd">{{ $t('collab.banner_title_highlight') }}</span>
                        {{ $t('collab.banner_title_2') }}
                    </h2>

                    <p
                        class="text-gray-500 dark:text-neutral-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                        {{ $t('collab.banner_desc') }}
                    </p>

                    <!-- Stats row -->
                    <div class="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                        <div v-for="stat in stats" :key="stat.label" class="flex items-center gap-2.5">
                            <!-- Logo -->
                            <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                :class="stat.logoBg">
                                <svg v-if="stat.platform === 'youtube'" viewBox="0 0 159 110" class="w-4 h-4"
                                    fill="none">
                                    <path
                                        d="M154 17.5c-1.82-6.73-7.07-12-13.8-13.8C128.4 0 79.5 0 79.5 0S30.6 0 18.8 3.7C12.07 5.5 6.82 10.77 5 17.5 1.5 29.4 1.5 55 1.5 55s0 25.6 3.5 37.5c1.82 6.73 7.07 12 13.8 13.8 11.8 3.7 60.7 3.7 60.7 3.7s48.9 0 60.7-3.7c6.73-1.8 11.98-7.07 13.8-13.8 3.5-11.9 3.5-37.5 3.5-37.5s0-25.6-3.5-37.5z"
                                        fill="#FF0000" />
                                    <path d="M64 78.77V31.23L104.5 55 64 78.77z" fill="#FFF" />
                                </svg>
                                <svg v-else-if="stat.platform === 'facebook'" viewBox="0 0 24 24" class="w-3.5 h-3.5"
                                    fill="#1877F2">
                                    <path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <svg v-else-if="stat.platform === 'tiktok'" viewBox="0 0 24 24" class="w-3.5 h-3.5">
                                    <path
                                        d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"
                                        class="fill-neutral-900 dark:fill-white" />
                                </svg>
                                <UIcon v-else name="i-lucide-handshake" class="w-3.5 h-3.5 text-tfd" />
                            </div>
                            <!-- Text -->
                            <div class="text-left">
                                <div class="text-xl font-bold text-tfd leading-none">{{ stat.value }}</div>
                                <div class="text-xs text-gray-400 dark:text-neutral-500 mt-0.5">{{ stat.label }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- CTAs -->
                    <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                        <NuxtLink :to="localePath('/collaborate')"
                            class="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-tfd text-white font-semibold rounded-xl hover:bg-red-700 hover:shadow-xl transition-all duration-200 shadow-lg text-sm">
                            <UIcon name="i-lucide-handshake" class="w-4 h-4" />
                            {{ $t('collab.cta_work_with_us') }}
                        </NuxtLink>
                        <NuxtLink :to="localePath('/collaborate') + '#contact'"
                            class="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent border-2 border-gray-300 dark:border-neutral-700 text-gray-600 dark:text-neutral-300 font-semibold rounded-xl hover:border-tfd hover:text-tfd dark:hover:text-white transition-all duration-200 text-sm">
                            <UIcon name="i-lucide-mail" class="w-4 h-4" />
                            {{ $t('collab.banner_inquiry') }}
                        </NuxtLink>
                    </div>
                </div>

                <!-- Right: partnership type cards -->
                <div class="w-full lg:w-auto shrink-0 grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0">
                    <div v-for="card in cards" :key="card.label"
                        class="flex items-center gap-3 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl px-4 py-4 hover:border-tfd/50 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all duration-200 shadow-sm dark:shadow-none">
                        <div class="w-9 h-9 rounded-xl bg-tfd/10 flex items-center justify-center shrink-0">
                            <UIcon :name="card.icon" class="w-4 h-4 text-tfd" />
                        </div>
                        <span class="text-gray-700 dark:text-neutral-300 text-xs font-medium leading-tight">{{
                            card.label }}</span>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const stats = computed(() => [
    { value: '44K+', label: t('collab.yt_subscribers'), platform: 'youtube', logoBg: 'bg-red-50 dark:bg-red-950/40' },
    { value: '35K+', label: t('collab.fb_followers') + ' (FB)', platform: 'facebook', logoBg: 'bg-blue-50 dark:bg-blue-950/40' },
    { value: '11K+', label: t('collab.tt_followers') + ' (TikTok)', platform: 'tiktok', logoBg: 'bg-gray-100 dark:bg-neutral-800' },
    { value: '10+', label: t('collab.banner_brands'), platform: null, logoBg: '' },
])

const cards = computed(() => [
    { icon: 'i-lucide-video', label: t('collab.type1_title') },
    { icon: 'i-lucide-package', label: t('collab.type2_title') },
    { icon: 'i-lucide-code-2', label: t('collab.type3_title') },
    { icon: 'i-lucide-cpu', label: t('collab.type4_title') },
    { icon: 'i-lucide-megaphone', label: t('collab.type5_title') },
    { icon: 'i-lucide-calendar', label: t('collab.type6_title') },
])
</script>
