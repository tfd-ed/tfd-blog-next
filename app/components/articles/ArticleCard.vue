<template>
    <NuxtLink :to="`/articles/${slug}`" class="group relative block h-80 sm:h-96">
        <!-- Dashed border background -->
        <span class="absolute inset-0 border-2 border-dashed border-gray-800 dark:border-gray-300 rounded-lg"></span>

        <!-- Main card with transform effect -->
        <div
            class="relative flex h-full transform items-end border-2 border-gray-800 dark:border-gray-300 bg-white dark:bg-neutral-800 rounded-lg transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 overflow-hidden">

            <!-- Default view - visible when not hovering -->
            <div
                class="px-6 pb-6 pt-6 w-full transition-opacity duration-300 group-hover:absolute group-hover:opacity-0">
                <!-- Article icon or image -->
                <div v-if="image" class="mb-4">
                    <NuxtImg :src="image" :alt="title" class="w-full h-48 sm:h-56 rounded-lg object-cover"
                        :provider="'ipx'" />
                </div>
                <div v-else class="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 sm:w-16 sm:h-16 text-tfd" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>

                <!-- Title -->
                <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white line-clamp-2">
                    {{ title }}
                </h2>

                <!-- Date and read time -->
                <div class="mt-3 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span v-if="date">{{ formatDate(date) }}</span>
                    <span v-if="readTime" class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ readTime }}
                    </span>
                </div>
            </div>

            <!-- Hover view - detailed information -->
            <div
                class="absolute inset-0 p-6 sm:p-8 opacity-0 transition-opacity duration-300 group-hover:relative group-hover:opacity-100 flex flex-col justify-between overflow-y-auto">
                <div>
                    <!-- Title on hover -->
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {{ title }}
                    </h3>

                    <!-- Description -->
                    <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
                        {{ description }}
                    </p>

                    <!-- Tags -->
                    <div v-if="tags && tags.length > 0" class="flex flex-wrap gap-2 mb-4">
                        <span v-for="tag in tags.slice(0, 3)" :key="tag"
                            class="px-2 py-1 text-xs font-medium bg-tfd/10 text-tfd dark:bg-tfd/20 rounded-full">
                            {{ tag }}
                        </span>
                    </div>

                    <!-- Author and stats -->
                    <div class="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                        <span v-if="author">{{ author }}</span>
                        <span v-if="date">{{ formatDate(date) }}</span>
                        <span v-if="readTime">{{ readTime }}</span>
                    </div>
                </div>

                <!-- Read more CTA -->
                <div class="mt-6">
                    <p
                        class="text-base sm:text-lg font-bold text-gray-900 dark:text-white hover:text-tfd dark:hover:text-tfd transition-colors">
                        Read more →
                    </p>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
    slug: string
    title: string
    description: string
    date?: string | Date
    image?: string
    tags?: string[]
    author?: string
    readTime?: string
}

const props = defineProps<Props>()

const formatDate = (date: string | Date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
