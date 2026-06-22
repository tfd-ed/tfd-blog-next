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

        <!-- Articles List - Clean Table Style -->
        <div v-if="displayedArticles.length > 0" class="space-y-6">
            <article v-for="article in displayedArticles" :key="article.path"
                class="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0">
                <div class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                    <!-- Date Column -->
                    <time v-if="article.date" class="text-sm text-gray-500 dark:text-gray-500  whitespace-nowrap"
                        :datetime="article.date">
                        {{ formatDateSimple(article.date) }}
                    </time>

                    <!-- Content Column -->
                    <div class="flex-1 min-w-0">
                        <NuxtLink :to="`/articles/${getArticleSlug(article.path)}`"
                            class="text-lg text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 underline decoration-transparent hover:decoration-current transition-colors">
                            {{ article.title }}
                        </NuxtLink>

                        <!-- Description (Optional) -->
                        <p v-if="article.description"
                            class="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {{ article.description }}
                        </p>

                        <!-- Tags (Minimal) -->
                        <div v-if="article.tags && article.tags.length > 0" class="mt-2 flex flex-wrap gap-2">
                            <span v-for="tag in article.tags.slice(0, 5)" :key="tag"
                                class="text-xs text-gray-500 dark:text-gray-500">
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </div>
            </article>
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

// Format date in simple format (YYYY-MM-DD)
const formatDateSimple = (date: string | Date) => {
    const d = new Date(date)
    return d.toISOString().split('T')[0]
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
