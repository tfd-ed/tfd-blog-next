<template>
    <div class="container mx-auto px-4 py-12 max-w-7xl">
        <!-- Header -->
        <div class="mb-8">
            <NuxtLink to="/playrooms" class="inline-flex items-center text-tfd hover:text-tfd/80 mb-4">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Playrooms
            </NuxtLink>
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {{ $t('da') }}
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300">
                {{ $t('da_description') }}
            </p>
        </div>

        <!-- Demo Area -->
        <div class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 mb-8">
            <div class="text-center py-16">
                <div class="text-6xl mb-4">📄</div>
                <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Coming Soon!
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-8">
                    This interactive document Q&A demo is currently under development. Stay tuned!
                </p>
                <NuxtLink to="/playrooms"
                    class="inline-block bg-tfd text-white px-6 py-3 rounded-lg font-semibold hover:bg-tfd/90 transition-colors">
                    Explore Other Models
                </NuxtLink>
            </div>
        </div>

        <!-- Information Cards -->
        <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Instant Answers</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Get immediate answers from your documents using advanced NLP.
                </p>
            </div>
            <div class="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Context-Aware</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Understand context and provide relevant, accurate responses.
                </p>
            </div>
            <div class="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-gray-200 dark:border-neutral-700">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Multi-Document</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Process and query across multiple documents simultaneously.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Document Q&A - AI Playrooms',
    meta: [
        { name: 'description', content: 'Ask questions and get instant answers from your documents using AI.' }
    ]
})
</script>
