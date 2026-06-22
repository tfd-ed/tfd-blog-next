<template>
    <div class="container mx-auto px-6 sm:px-8 md:px-12 py-12 max-w-4xl">
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
            <!-- Title -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-relaxed">
                {{ article.title }}
            </h1>

            <!-- Meta Information -->
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6 not-prose">
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
            <div v-if="article.tags && article.tags.length > 0" class="flex flex-wrap gap-2 mb-6 not-prose">
                <span v-for="tag in article.tags" :key="tag"
                    class="px-3 py-1 text-sm font-medium bg-tfd/10 text-tfd dark:bg-tfd/20 rounded-full">
                    {{ tag }}
                </span>
            </div>

            <!-- Description -->
            <div v-if="article.description"
                class="not-prose border-l-4 border-tfd bg-tfd/5 dark:bg-tfd/10 rounded-r-lg px-5 py-4 mb-6">
                <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    {{ article.description }}
                </p>
            </div>

            <!-- Share Buttons -->
            <div class="not-prose mb-6">
                <SocialShareButtons />
            </div>

            <!-- Featured Image -->
            <div v-if="article.image" class="not-prose mb-8">
                <div class="w-full max-w-3xl mx-auto rounded-xl bg-white dark:bg-gray-900">
                    <NuxtImg :src="article.image" :alt="article.title" provider="cloudflare"
                        class="w-full h-auto max-h-[500px] object-contain rounded-xl" />
                </div>
            </div>

            <!-- Divider -->
            <hr class="not-prose border-gray-200 dark:border-gray-700 mb-8" />

            <!-- Article Content -->
            <div class="article-content">
                <ContentRenderer :value="article" />
            </div>
        </article>

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
// Key uses route.path (stable across SSR and client hydration) to prevent
// cache-key mismatches caused by detectBrowserLanguage changing locale before hydration.
const { data: article } = await useAsyncData(
    `article-${route.path}`,
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

// SEO Meta tags
// useHead({
//     title: `${article.value?.title} - Teaching For Development`,
//     meta: [
//         { name: 'description', content: article.value?.description || '' },
//         { property: 'og:title', content: article.value?.title || '' },
//         { property: 'og:description', content: article.value?.description || '' },
//         { property: 'og:image', content: article.value?.image || '' }
//     ]
// })

const pageTitle = computed(() =>
    article.value?.title ? `${article.value.title} - Teaching For Development` : 'Teaching For Development'
)

defineOgImage('BlogPost', {
    title: article.value?.title,
    author: article.value?.author,
    date: article.value?.date,
})

useSeoMeta({
    title: pageTitle,
    description: article.value?.description,
    ogTitle: pageTitle,
    ogDescription: article.value?.description,
    ogType: 'article',
    ogUrl: `https://tfdevs.com${route.path}`,
    ogSiteName: 'Teaching For Development',
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: article.value?.description,
    articlePublishedTime: article.value?.date ? new Date(article.value.date).toISOString() : undefined,
    articleAuthor: article.value?.author ? [article.value.author] : undefined,
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
