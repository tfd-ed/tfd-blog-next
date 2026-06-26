<template>
    <div class="container mx-auto px-6 py-16 max-w-4xl">
        <!-- Page Header - Minimalist -->
        <header class="mb-12 pb-8 border-b border-gray-300 dark:border-gray-700">
            <h1 class="text-3xl  font-normal text-gray-900 dark:text-gray-100 mb-2">
                {{ t('articles') }}
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ t('articles_description') }}
            </p>
        </header>

        <!-- Simple Search -->
        <div v-if="articles && articles.length > 10" class="mb-8">
            <input v-model="searchQuery" type="text" :placeholder="t('search_articles')"
                class="w-full max-w-md px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gray-500 dark:focus:border-gray-500" />
        </div>

        <!-- Articles List - Card Style (matching home page) -->
        <div v-if="displayedArticles.length > 0" class="space-y-3">
            <NuxtLink v-for="article in displayedArticles" :key="article.path"
                :to="`/articles/${getArticleSlug(article.path)}`"
                class="group flex gap-4 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-800 hover:border-tfd dark:hover:border-tfd transition-colors duration-200">
                <!-- Thumbnail -->
                <div class="shrink-0 w-24 h-18 rounded-lg overflow-hidden bg-gray-100 dark:bg-neutral-700 self-start">
                    <NuxtImg v-if="article.image" provider="cloudflare" :src="article.image" :alt="article.title"
                        class="w-full h-full object-cover" loading="lazy" />
                    <div v-else class="w-full h-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <p v-if="article.description" class="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                        {{ article.description }}
                    </p>
                    <div class="mt-2 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                        <span v-if="article.date">{{ formatDate(article.date) }}</span>
                        <span v-if="article.readTime">· {{ article.readTime }}</span>
                    </div>
                </div>
            </NuxtLink>
        </div>

        <!-- No Results -->
        <div v-else class="py-12 text-center">
            <p class="text-gray-500 dark:text-gray-500">{{ t('no_articles_found') }}</p>
        </div>

        <!-- Load More - Simple -->
        <div v-if="hasMore" class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <button @click="loadMore"
                class="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 underline">
                {{ t('load_more') }} →
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Collections } from '@nuxt/content'

const { locale, t } = useI18n()

// Reactive state
const searchQuery = ref('')
const articlesPerPage = 50
const currentPage = ref(1)

// Fetch articles based on locale
const { data: articles } = await useAsyncData(
    `articles-${locale.value}`,
    async () => {
        const collection = ('content_' + locale.value) as keyof Collections
        const results = await queryCollection(collection)
            .where('path', 'LIKE', '/articles/%')
            .where('published', '=', true)
            .all()

        // Sort by date in JavaScript (newest first)
        return results.sort((a: any, b: any) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0
            const dateB = b.date ? new Date(b.date).getTime() : 0
            return dateB - dateA
        })
    },
    {
        watch: [locale]
    }
)

// Computed: Filtered articles based on search
const filteredArticles = computed(() => {
    if (!articles.value) return []

    let filtered = [...articles.value]

    // Apply search filter
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        filtered = filtered.filter(article => {
            return (
                article.title?.toLowerCase().includes(query) ||
                article.description?.toLowerCase().includes(query) ||
                article.tags?.some((tag: string) => tag.toLowerCase().includes(query))
            )
        })
    }

    return filtered
})

// Computed: Displayed articles with pagination
const displayedArticles = computed(() => {
    return filteredArticles.value.slice(0, currentPage.value * articlesPerPage)
})

// Computed: Check if there are more articles to load
const hasMore = computed(() => {
    return displayedArticles.value.length < filteredArticles.value.length
})

// Extract slug from path
const getArticleSlug = (path: string | undefined) => {
    if (!path) return ''
    return path.split('/').pop() || ''
}

// Format date to match home page style (e.g., "Jan 15, 2024")
const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

// Load more articles
const loadMore = () => {
    currentPage.value++
}

// Reset pagination when search changes
watch(searchQuery, () => {
    currentPage.value = 1
})

defineOgImage('BlogPost', {
    title: 'Articles',
    author: 'Teaching For Development',
})

useSeoMeta({
    title: 'Articles',
    description: 'Research notes, technical writing, and thoughts.',
})
</script>
