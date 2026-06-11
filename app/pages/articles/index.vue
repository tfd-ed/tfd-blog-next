<template>
    <div class="container mx-auto px-4 py-12 max-w-7xl">
        <!-- Page Header -->
        <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {{ $t('articles') }}
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {{ $t('articles_page_description') }}
            </p>
        </div>

        <!-- Search and Filter Section -->
        <div class="mb-8 space-y-4">
            <!-- Search Bar -->
            <div class="relative max-w-2xl mx-auto">
                <input v-model="searchQuery" type="text" :placeholder="$t('search_articles_placeholder')"
                    class="w-full px-5 py-3 pl-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-tfd dark:focus:border-tfd transition-colors" />
                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <!-- Filter by Date -->
            <div class="flex flex-wrap justify-center gap-4">
                <button v-for="filter in dateFilters" :key="filter.value" @click="selectedDateFilter = filter.value"
                    :class="[
                        'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                        selectedDateFilter === filter.value
                            ? 'bg-tfd text-white shadow-md'
                            : 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-600'
                    ]">
                    {{ filter.label }}
                </button>
            </div>

            <!-- Results Count -->
            <div class="text-center text-sm text-gray-600 dark:text-gray-400">
                {{ $t('showing_articles', { displayed: displayedArticles.length, total: filteredArticles.length }) }}
            </div>
        </div>

        <!-- Articles Grid -->
        <div v-if="displayedArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <ArticleCard v-for="article in displayedArticles" :key="article.path" :slug="getArticleSlug(article.path)"
                :title="article.title" :description="article.description" :date="article.date" :image="article.image"
                :tags="article.tags" :author="article.author" :readTime="article.readTime" />
        </div>

        <!-- No Results Message -->
        <div v-else class="text-center py-12">
            <svg class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{{ $t('no_articles_found') }}</h3>
            <p class="text-gray-500 dark:text-gray-400">{{ $t('adjust_search_filters') }}</p>
        </div>

        <!-- Load More Button -->
        <div v-if="hasMore" class="mt-12 text-center">
            <button @click="loadMore"
                class="px-8 py-3 bg-tfd text-white font-semibold rounded-lg hover:bg-tfd/90 transition-all duration-200 hover:shadow-lg">
                {{ $t('load_more_articles') }}
            </button>
        </div>

        <!-- Scroll to Top Button -->
        <button v-if="showScrollTop" @click="scrollToTop"
            class="fixed bottom-8 right-8 p-3 bg-tfd text-white rounded-full shadow-lg hover:bg-tfd/90 transition-all duration-200 z-50">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Collections } from '@nuxt/content'

const { locale, t } = useI18n()

// Reactive state
const searchQuery = ref('')
const selectedDateFilter = ref('all')
const articlesPerPage = 5
const currentPage = ref(1)
const showScrollTop = ref(false)

// Date filter options
const dateFilters = computed(() => [
    { label: t('filter_all_time'), value: 'all' },
    { label: t('filter_last_week'), value: 'week' },
    { label: t('filter_last_month'), value: 'month' },
    { label: t('filter_last_3_months'), value: '3months' },
    { label: t('filter_last_year'), value: 'year' }
])

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

// Computed: Filtered articles based on search and date filter
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
                article.body?.children?.some((child: any) =>
                    child.children?.some((c: any) =>
                        c.value?.toLowerCase().includes(query)
                    )
                ) ||
                article.tags?.some((tag: string) => tag.toLowerCase().includes(query))
            )
        })
    }

    // Apply date filter
    if (selectedDateFilter.value !== 'all') {
        const now = new Date()
        const filterDate = new Date()

        switch (selectedDateFilter.value) {
            case 'week':
                filterDate.setDate(now.getDate() - 7)
                break
            case 'month':
                filterDate.setMonth(now.getMonth() - 1)
                break
            case '3months':
                filterDate.setMonth(now.getMonth() - 3)
                break
            case 'year':
                filterDate.setFullYear(now.getFullYear() - 1)
                break
        }

        filtered = filtered.filter(article => {
            if (!article.date) return false
            const articleDate = new Date(article.date)
            return articleDate >= filterDate
        })
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0
        const dateB = b.date ? new Date(b.date).getTime() : 0
        return dateB - dateA
    })

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

// Load more articles
const loadMore = () => {
    currentPage.value++
}

// Scroll to top
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Handle scroll for showing scroll-to-top button
const handleScroll = () => {
    showScrollTop.value = window.scrollY > 500
}

// Reset pagination when search or filter changes
watch([searchQuery, selectedDateFilter], () => {
    currentPage.value = 1
})

// Lifecycle hooks
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

defineOgImage('BlogPost', {
    title: 'Articles',
    author: 'Teaching For Development',
})

useSeoMeta({
    title: 'Articles - Teaching For Development',
    description: 'Explore our latest articles on technology, development, AI, and innovation.',
    ogTitle: 'Articles - Teaching For Development',
    ogDescription: 'Explore our latest articles on technology, development, AI, and innovation.',
    ogType: 'website',
    ogUrl: 'https://tfdevs.com/articles',
    ogSiteName: 'Teaching For Development',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Articles - Teaching For Development',
    twitterDescription: 'Explore our latest articles on technology, development, AI, and innovation.',
})
</script>
