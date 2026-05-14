<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { locale } = useI18n()

// Fetch content based on current locale with fallback
const { data: page } = await useAsyncData(
    'services-' + locale.value,
    async () => {
        const collection = ('content_' + locale.value) as keyof Collections
        const content = await queryCollection(collection).path('/services').first()

        if (!content && locale.value !== 'en') {
            return await queryCollection('content_en').path('/services').first()
        }

        return content
    },
    {
        watch: [locale],
    }
)

// SEO Meta
useSeoMeta({
    title: page.value?.title || 'Software Consulting Services - Technology For Development',
    description: page.value?.description || 'Professional software consulting and development services'
})

// Form state
const form = ref({
    name: '',
    email: '',
    company: '',
    description: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const submitInquiry = async () => {
    isSubmitting.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    showSuccess.value = true
    isSubmitting.value = false

    // Reset form
    form.value = {
        name: '',
        email: '',
        company: '',
        description: ''
    }

    // Hide success message after 5 seconds
    setTimeout(() => {
        showSuccess.value = false
    }, 5000)
}

// Featured projects
const projects = [
    { key: 'project_1', icon: '📚' },
    { key: 'project_2', icon: '🎯' },
    { key: 'project_3', icon: '🏥' },
    { key: 'project_4', icon: '🛒' },
]

// Sample clients (you can replace with actual logos)
const clients = [
    { name: 'TechCorp', initial: 'TC' },
    { name: 'Innovation Labs', initial: 'IL' },
    { name: 'Digital Solutions', initial: 'DS' },
    { name: 'Smart Systems', initial: 'SS' },
]
</script>

<template>
    <div class="container mx-auto px-4 py-24 max-w-7xl">
        <!-- Header -->
        <div class="mb-16 text-center">
            <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {{ page?.title }}
            </h1>
            <p v-if="page?.description" class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {{ page.description }}
            </p>
        </div>

        <!-- Content -->
        <div class="prose prose-lg dark:prose-invert max-w-4xl mx-auto px-8 md:px-12 lg:px-16 mb-16">
            <ContentRenderer v-if="page" :value="page" />
            <div v-else class="text-center text-gray-600 dark:text-gray-400 py-12">
                <h2 class="text-2xl font-bold mb-4">Page not found</h2>
                <p>This page doesn't exist in {{ locale }} language.</p>
            </div>
        </div>

        <!-- Featured Projects Section -->
        <div v-if="page" class="mb-20">
            <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                {{ $t('featured_projects') }}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                <div v-for="project in projects" :key="project.key"
                    class="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div class="text-4xl mb-4">{{ project.icon }}</div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {{ $t(`${project.key}_title`) }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300">
                        {{ $t(`${project.key}_desc`) }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Clients Section -->
        <div v-if="page" class="mb-20 text-center">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {{ $t('trusted_by') }}
            </h3>
            <div class="flex flex-wrap justify-center gap-8 items-center">
                <div v-for="client in clients" :key="client.name"
                    class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-700 dark:to-neutral-800 rounded-lg flex items-center justify-center shadow-md">
                    <span class="text-2xl font-bold text-gray-700 dark:text-gray-300">{{ client.initial }}</span>
                </div>
            </div>
        </div>

        <!-- Consulting Rates Section -->
        <div v-if="page" class="mb-20">
            <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
                {{ $t('consulting_rates') }}
            </h2>
            <p class="text-center text-gray-600 dark:text-gray-300 mb-12">
                {{ $t('consulting_rates_description') }}
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <!-- Hourly Rate -->
                <div
                    class="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {{ $t('hourly_rate') }}
                    </h3>
                    <div class="text-4xl font-bold text-tfd mb-2">$50-80</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ $t('per_hour') }}</div>
                    <p class="text-gray-600 dark:text-gray-300 text-sm">
                        {{ $t('rate_hourly_desc') }}
                    </p>
                </div>

                <!-- Project-Based -->
                <div
                    class="bg-gradient-to-br from-tfd to-red-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-white relative">
                    <div class="absolute top-4 right-4 bg-white text-tfd px-3 py-1 rounded-full text-xs font-semibold">
                        Popular
                    </div>
                    <h3 class="text-xl font-bold mb-2">
                        {{ $t('project_rate') }}
                    </h3>
                    <div class="text-4xl font-bold mb-2">{{ $t('custom_quote') }}</div>
                    <div class="text-sm opacity-90 mb-4">Based on scope</div>
                    <p class="text-sm opacity-90">
                        {{ $t('rate_project_desc') }}
                    </p>
                </div>

                <!-- Monthly Retainer -->
                <div
                    class="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {{ $t('monthly_retainer') }}
                    </h3>
                    <div class="text-4xl font-bold text-tfd mb-2">$3000+</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ $t('per_month') }}</div>
                    <p class="text-gray-600 dark:text-gray-300 text-sm">
                        {{ $t('rate_retainer_desc') }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Inquiry Form Section -->
        <div v-if="page"
            class="max-w-2xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 p-8 md:p-12 rounded-2xl shadow-xl">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                {{ $t('get_in_touch') }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-8 text-center">
                {{ $t('get_in_touch_description') }}
            </p>

            <!-- Success Message -->
            <div v-if="showSuccess"
                class="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 rounded-lg">
                ✓ {{ $t('inquiry_success') }}
            </div>

            <form @submit.prevent="submitInquiry" class="space-y-6">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {{ $t('your_name') }} *
                    </label>
                    <input v-model="form.name" type="text" required
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-tfd focus:border-transparent" />
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {{ $t('your_email') }} *
                    </label>
                    <input v-model="form.email" type="email" required
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-tfd focus:border-transparent" />
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {{ $t('your_company') }}
                    </label>
                    <input v-model="form.company" type="text"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-tfd focus:border-transparent" />
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {{ $t('project_description') }} *
                    </label>
                    <textarea v-model="form.description" required rows="5"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-tfd focus:border-transparent resize-none"></textarea>
                </div>

                <button type="submit" :disabled="isSubmitting"
                    class="w-full bg-tfd hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ isSubmitting ? $t('submitting') : $t('send_inquiry') }}
                </button>
            </form>
        </div>

        <!-- Contact Section -->
        <div v-if="page" class="mt-16 text-center">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {{ $t('join_our_social_networks') }}
            </h3>
            <ConnectWithUs />
        </div>
    </div>
</template>