<template>
    <section class="container mx-auto px-4 py-12 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            <!-- ── Latest Articles ────────────────────────────────── -->
            <div>
                <div class="flex items-center justify-between mb-5">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ $t('latest_articles') }}</h2>
                    <NuxtLink to="/articles"
                        class="text-sm font-medium text-tfd hover:text-tfd/80 transition-colors flex items-center gap-1">
                        {{ $t('view_all_articles') }}
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </NuxtLink>
                </div>

                <div v-if="articles && articles.length" class="space-y-3">
                    <NuxtLink v-for="article in articles" :key="article.path" :to="`/articles/${getSlug(article.path)}`"
                        class="group flex gap-4 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-800 hover:border-tfd dark:hover:border-tfd transition-colors duration-200">
                        <!-- Thumbnail -->
                        <div
                            class="shrink-0 w-24 h-18 rounded-lg overflow-hidden bg-gray-100 dark:bg-neutral-700 self-start">
                            <NuxtImg v-if="article.image" provider="cloudflare" :src="article.image"
                                :alt="article.title" class="w-full h-full object-cover" loading="lazy" />
                            <div v-else class="w-full h-full flex items-center justify-center">
                                <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>

                        <!-- Info -->
                        <div class="flex-1 min-w-0">
                            <h3
                                class="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm leading-snug group-hover:text-tfd transition-colors">
                                {{ article.title }}
                            </h3>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                {{ article.description }}
                            </p>
                            <div class="mt-2 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                                <span v-if="article.date">{{ formatDate(article.date) }}</span>
                                <span v-if="article.readTime">· {{ article.readTime }}</span>
                            </div>
                        </div>
                    </NuxtLink>
                </div>

                <p v-else class="text-sm text-gray-500 dark:text-gray-400">{{ $t('no_articles') }}</p>
            </div>

            <!-- ── Latest Videos ──────────────────────────────────── -->
            <div>
                <div class="flex items-center justify-between mb-5">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ $t('latest_videos') }}</h2>
                    <a :href="channelLink" target="_blank" rel="noopener noreferrer"
                        class="text-sm font-medium text-tfd hover:text-tfd/80 transition-colors flex items-center gap-1">
                        {{ $t('view_all_videos') }}
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                <div class="space-y-3">
                    <a v-for="video in videos" :key="video.id" :href="`https://www.youtube.com/watch?v=${video.id}`"
                        target="_blank" rel="noopener noreferrer"
                        class="group flex gap-4 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-800 hover:border-red-500 dark:hover:border-red-500 transition-colors duration-200">
                        <!-- Thumbnail -->
                        <div
                            class="relative shrink-0 w-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-neutral-700 self-start aspect-video">
                            <img :src="`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`" :alt="video.title"
                                class="w-full h-full object-cover" loading="lazy" />
                            <!-- Play overlay -->
                            <div
                                class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Info -->
                        <div class="flex-1 min-w-0">
                            <h3
                                class="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm leading-snug group-hover:text-red-500 transition-colors">
                                {{ video.title }}
                            </h3>
                            <p v-if="video.description"
                                class="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                {{ video.description }}
                            </p>
                            <div v-if="video.publishedAt" class="mt-2 text-xs text-gray-400 dark:text-gray-500">
                                {{ formatDate(video.publishedAt) }}
                            </div>
                        </div>
                    </a>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import type { Collections } from '@nuxt/content'

interface Video {
    id: string
    title: string
    description?: string
    publishedAt?: string | Date
}

const props = withDefaults(defineProps<{
    videos: Video[]
    channelLink?: string
}>(), {
    channelLink: 'https://www.youtube.com/@tfdevs'
})

const { locale } = useI18n()

const { data: articles } = await useAsyncData(
    `home-latest-articles-${locale.value}`,
    async () => {
        const collection = ('content_' + locale.value) as keyof Collections
        const results = await queryCollection(collection)
            .where('path', 'LIKE', '/articles/%')
            .where('published', '=', true)
            .all()
        return results
            .sort((a: any, b: any) => {
                const dateA = a.date ? new Date(a.date).getTime() : 0
                const dateB = b.date ? new Date(b.date).getTime() : 0
                return dateB - dateA
            })
            .slice(0, 3)
    },
    { watch: [locale] }
)

function getSlug(path: string) {
    return path.split('/').pop() ?? path
}

function formatDate(date: string | Date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    })
}
</script>
