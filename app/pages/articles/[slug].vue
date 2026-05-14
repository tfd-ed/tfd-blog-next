<template>
    <div class="container mx-auto px-4 py-12 max-w-4xl">
        <!-- Back Button -->
        <NuxtLink to="/articles"
            class="inline-flex items-center gap-2 text-tfd hover:text-tfd/80 font-medium mb-8 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            {{ $t('back_to_articles') }}
        </NuxtLink>

        <!-- Article Header -->
        <article class="prose prose-lg dark:prose-invert max-w-none">
            <!-- Featured Image -->
            <div v-if="article.image" class="mb-8 -mx-4 sm:mx-0">
                <NuxtImg :src="article.image" :alt="article.title"
                    class="w-full h-64 sm:h-96 object-cover rounded-lg shadow-lg" :provider="'ipx'" />
            </div>

            <!-- Title -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {{ article.title }}
            </h1>

            <!-- Meta Information -->
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8 not-prose">
                <span v-if="article.author" class="flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ article.author }}
                </span>
                <span v-if="article.date" class="flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ formatDate(article.date) }}
                </span>
                <span v-if="article.readTime" class="flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ article.readTime }}
                </span>
            </div>

            <!-- Tags -->
            <div v-if="article.tags && article.tags.length > 0" class="flex flex-wrap gap-2 mb-8 not-prose">
                <span v-for="tag in article.tags" :key="tag"
                    class="px-3 py-1 text-sm font-medium bg-tfd/10 text-tfd dark:bg-tfd/20 rounded-full">
                    {{ tag }}
                </span>
            </div>

            <!-- Description -->
            <p v-if="article.description" class="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {{ article.description }}
            </p>

            <!-- Article Content -->
            <div class="article-content">
                <ContentRenderer :value="article" />
            </div>
        </article>

        <!-- Share Section -->
        <!-- <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ $t('share_this_article') }}</h3>
            <div class="flex gap-4">
                <button @click="shareOnTwitter"
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    {{ $t('twitter') }}
                </button>
                <button @click="shareOnFacebook"
                    class="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                    {{ $t('facebook') }}
                </button>
                <button @click="copyLink"
                    class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    {{ $t('copy_link') }}
                </button>
            </div>
        </div> -->

        <!-- Navigation to other articles -->
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <NuxtLink to="/articles"
                class="inline-flex items-center gap-2 px-6 py-3 bg-tfd text-white font-semibold rounded-lg hover:bg-tfd/90 transition-all duration-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {{ $t('view_all_articles') }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()

const slug = route.params.slug as string

// Fetch the article
const { data: article } = await useAsyncData(
    `article-${slug}-${locale.value}`,
    async () => {
        const collection = ('content_' + locale.value) as keyof Collections
        return await queryCollection(collection).path(`/articles/${slug}`).first()
    },
    {
        watch: [locale]
    }
)

// If article not found, show error
if (!article.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Article Not Found'
    })
}

// Format date
const formatDate = (date: string | Date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Share functions
const shareOnTwitter = () => {
    const url = window.location.href
    const text = article.value?.title || ''
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
}

const shareOnFacebook = () => {
    const url = window.location.href
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
}

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
    } catch (err) {
        console.error('Failed to copy link:', err)
    }
}

// SEO Meta tags
useHead({
    title: `${article.value?.title} - Teaching For Development`,
    meta: [
        { name: 'description', content: article.value?.description || '' },
        { property: 'og:title', content: article.value?.title || '' },
        { property: 'og:description', content: article.value?.description || '' },
        { property: 'og:image', content: article.value?.image || '' }
    ]
})
</script>

<style>
.article-content {
    color: rgb(31 41 55);
}

:global(.dark) .article-content {
    color: rgb(229 231 235);
}

.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4,
.article-content h5,
.article-content h6 {
    font-weight: 700;
    color: rgb(17 24 39);
    margin-top: 2rem;
    margin-bottom: 1rem;
}

:global(.dark) .article-content h1,
:global(.dark) .article-content h2,
:global(.dark) .article-content h3,
:global(.dark) .article-content h4,
:global(.dark) .article-content h5,
:global(.dark) .article-content h6 {
    color: rgb(255 255 255);
}

.article-content h2 {
    font-size: 1.875rem;
    line-height: 2.25rem;
}

.article-content h3 {
    font-size: 1.5rem;
    line-height: 2rem;
}

.article-content p {
    margin-bottom: 1rem;
    line-height: 1.625;
}

.article-content ul,
.article-content ol {
    margin-bottom: 1rem;
    margin-left: 1.5rem;
}

.article-content li {
    margin-bottom: 0.5rem;
}

.article-content a {
    color: #FF5722;
    text-decoration: underline;
}

.article-content a:hover {
    opacity: 0.8;
}

.article-content code {
    background-color: rgb(243 244 246);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
}

:global(.dark) .article-content code {
    background-color: rgb(31 41 55);
}

.article-content pre {
    background-color: rgb(17 24 39);
    color: rgb(243 244 246);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-bottom: 1rem;
}

.article-content pre code {
    background-color: transparent;
    padding: 0;
}

.article-content blockquote {
    border-left: 4px solid #FF5722;
    padding-left: 1rem;
    font-style: italic;
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: rgb(55 65 81);
}

:global(.dark) .article-content blockquote {
    color: rgb(209 213 219);
}

.article-content img {
    border-radius: 0.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.article-content table {
    width: 100%;
    margin-bottom: 1rem;
    border-collapse: collapse;
}

.article-content th,
.article-content td {
    border: 1px solid rgb(209 213 219);
    padding: 0.5rem 1rem;
}

:global(.dark) .article-content th,
:global(.dark) .article-content td {
    border-color: rgb(55 65 81);
}

.article-content th {
    background-color: rgb(243 244 246);
    font-weight: 600;
}

:global(.dark) .article-content th {
    background-color: rgb(31 41 55);
}
</style>
