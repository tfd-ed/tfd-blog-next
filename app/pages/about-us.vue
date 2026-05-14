<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { locale } = useI18n()

// Fetch content based on current locale with fallback
const { data: page } = await useAsyncData(
    'about-us-' + locale.value,
    async () => {
        // Build collection name based on current locale
        const collection = ('content_' + locale.value) as keyof Collections
        const content = await queryCollection(collection).path('/about-us').first()

        // Fallback to English if content is missing
        if (!content && locale.value !== 'en') {
            return await queryCollection('content_en').path('/about-us').first()
        }

        return content
    },
    {
        watch: [locale], // Refetch when locale changes
    }
)

// SEO Meta
useSeoMeta({
    title: page.value?.title || 'About Us - Technology For Development',
    description: page.value?.description || 'Learn about our mission to bring technology education to everyone in Cambodia'
})
</script>

<template>
    <div class="container mx-auto px-4 py-24 max-w-7xl">
        <!-- Header -->
        <div class="mb-2 text-center">
            <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {{ page?.title }}
            </h1>
            <p v-if="page?.description" class="text-xl text-gray-600 dark:text-gray-300">
                {{ page.description }}
            </p>
        </div>

        <!-- Content -->
        <div class="prose prose-lg dark:prose-invert max-w-4xl mx-auto px-8 md:px-12 lg:px-16 py-8">
            <ContentRenderer v-if="page" :value="page" />
            <div v-else class="text-center text-gray-600 dark:text-gray-400 py-12">
                <h2 class="text-2xl font-bold mb-4">Page not found</h2>
                <p>This page doesn't exist in {{ locale }} language.</p>
            </div>
        </div>

        <div v-if="page" class="mt-16 text-center">
            <!-- <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {{ $t('join_our_social_networks') }}
            </h3> -->
            <ConnectWithUs />
        </div>




        <!-- Call to Action Section -->
        <!-- <div v-if="page" class="mt-16 bg-gradient-to-r from-tfd to-red-700 rounded-2xl p-12 text-center text-white">
            <h2 class="text-3xl font-bold mb-4">
                {{ $t('technology_for_all') }}
            </h2>
            <p class="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                {{ $t('thanks_for_support') }}
            </p>
            <div class="flex flex-wrap gap-4 justify-center">
                <NuxtLink to="/playrooms"
                    class="px-8 py-4 bg-white text-tfd rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">
                    {{ $t('ai_portal') }}
                </NuxtLink>
                <NuxtLink to="/#bootcamps"
                    class="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-tfd transition-all">
                    {{ $t('bootcamp') }}
                </NuxtLink>
            </div>
        </div> -->

        <!-- Contact Section -->

    </div>
</template>
