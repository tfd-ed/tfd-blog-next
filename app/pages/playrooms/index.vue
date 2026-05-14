<template>
    <div class="container mx-auto px-4 py-12 max-w-7xl">
        <!-- Page Header -->
        <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {{ $t('ai_portal') }}
            </h1>
            <!-- <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {{ $t('ai_room_description') }}
            </p> -->
        </div>

        <!-- AI Models Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <AIModelCard v-for="model in aiModels" :key="model.id" :icon="model.icon" :title="$t(model.titleKey)"
                :description="$t(model.descriptionKey)" :badge="model.badge" :available="model.available"
                :features="model.features" :stats="model.stats" @click="navigateToPlayroom(model.route)" />
        </div>

        <!-- Bottom CTA Section -->
        <!-- <div
            class="mt-16 text-center bg-gradient-to-r from-tfd/10 to-tfd/5 dark:from-tfd/20 dark:to-tfd/10 rounded-2xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Ready to Explore More?
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
                Join our community and stay updated with the latest AI innovations
            </p>
            <NuxtLink to="/"
                class="inline-block bg-tfd text-white px-8 py-3 rounded-lg font-semibold hover:bg-tfd/90 transition-all duration-200 hover:shadow-lg">
                {{ $t('home') }}
            </NuxtLink>
        </div> -->
    </div>
</template>

<script setup lang="ts">
const router = useRouter()

// Navigate to playroom function
const navigateToPlayroom = (route: string) => {
    router.push(route)
}

// Define AI models data
const aiModels = ref([
    {
        id: 'explore-gradient-decent',
        titleKey: 'gradient_descent',
        descriptionKey: 'gradient_descent_description',
        icon: '📉',
        available: true,
        route: '/playrooms/gradient-descent',
    },
    {
        id: 'object-detection',
        titleKey: 'od',
        descriptionKey: 'od_description',
        icon: '🎯',
        // badge: 'Popular',
        available: true,
        route: '/playrooms/object-detection',
        // features: [
        //     'Real-time object recognition',
        //     'Multiple object tracking',
        //     'Custom model training'
        // ],
        // stats: [
        //     { value: '95%', label: 'Accuracy' },
        //     { value: '30fps', label: 'Speed' }
        // ]
    },
    {
        id: 'document-qa',
        titleKey: 'da',
        descriptionKey: 'da_description',
        icon: '📄',
        badge: null,
        available: true,
        route: '/playrooms/document-qa',
        // features: [
        //     'Instant answers from PDFs',
        //     'Context-aware responses',
        //     'Multi-document support'
        // ],
        // stats: [
        //     { value: '1000+', label: 'Documents' },
        //     { value: '<2s', label: 'Response' }
        // ]
    },
    {
        id: 'text-summarization',
        titleKey: 'sum',
        descriptionKey: 'sum_description',
        icon: '📝',
        badge: null,
        available: false,
        route: '/playrooms/summarization',
        // features: [
        //     'Intelligent text condensing',
        //     'Key point extraction',
        //     'Multiple summary lengths'
        // ],
        stats: null
    },
    {
        id: 'spam-detection',
        titleKey: 'spam',
        descriptionKey: 'spam_description',
        icon: '🛡️',
        badge: null,
        available: false,
        route: '/playrooms/spam-detection',
        // features: [
        //     'Email spam filtering',
        //     'ML-based classification',
        //     'Real-time analysis'
        // ],
        stats: null
    },
    {
        id: 'reinforcement-learning',
        titleKey: 'rl',
        descriptionKey: 'rl_description',
        icon: '🤖',
        badge: 'Advanced',
        available: false,
        route: '/playrooms/reinforcement-learning',
        // features: [
        //     'Agent training simulation',
        //     'Reward-based learning',
        //     'Interactive environments'
        // ],
        stats: null
    },
    {
        id: 'motion-tracking',
        titleKey: 'motion_tracking',
        descriptionKey: 'motion_tracking_description',
        icon: '🎥',
        badge: null,
        available: false,
        route: '/playrooms/motion-tracking',
        features: [
            'Real-time motion capture',
            'Pose estimation',
            'Activity recognition'
        ],
        stats: null
    }
])

defineOgImage('BlogPost', {
    title: 'AI & ML Playroom',
    author: 'Teaching For Development',
})

useSeoMeta({
    title: 'AI & ML Playroom - Teaching For Development',
    description: 'Explore interactive AI and machine learning demos. Try object detection, document Q&A, text summarization, and more.',
    ogTitle: 'AI & ML Playroom - Teaching For Development',
    ogDescription: 'Explore interactive AI and machine learning demos. Try object detection, document Q&A, text summarization, and more.',
    ogType: 'website',
    ogUrl: 'https://tfdevs.com/playrooms',
    ogSiteName: 'Teaching For Development',
    twitterCard: 'summary_large_image',
    twitterTitle: 'AI & ML Playroom - Teaching For Development',
    twitterDescription: 'Explore interactive AI and machine learning demos. Try object detection, document Q&A, text summarization, and more.',
})
</script>
