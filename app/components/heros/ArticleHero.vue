<template>
    <section
        class="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div class="container mx-auto px-4 space-y-12">
            <!-- Horizontal Image Marquee -->
            <div class="relative w-full">
                <UMarquee pause-on-hover :repeat="3" :ui="{
                    root: '[--gap:--spacing(4)] [--duration:110s]',
                    content: 'gap-4'
                }">
                    <div v-for="(image, index) in images" :key="index"
                        class="relative h-64 md:h-80 w-80 md:w-96 shrink-0 rounded-2xl overflow-hidden shadow-2xl">
                        <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                </UMarquee>
            </div>

            <!-- Text Content -->
            <div class="max-w-4xl mx-auto text-center space-y-6">
                <div class="space-y-4">
                    <!-- Quote Icon -->
                    <div class="w-12 h-12 flex items-center justify-center bg-tfd/10 dark:bg-tfd/20 rounded-lg mx-auto">
                        <svg class="w-6 h-6 text-tfd" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                    </div>

                    <!-- Title (Italic Bold) -->
                    <h1
                        class="text-3xl md:text-4xl lg:text-5xl font-bold italic text-gray-900 dark:text-white leading-tight">
                        {{ title }}
                    </h1>

                    <!-- Description (Normal Text) -->
                    <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ description }}
                    </p>

                    <!-- Optional Author/Source -->
                    <div v-if="author" class="pt-4 border-t border-gray-200 dark:border-gray-700 inline-block">
                        <a href="https://github.com/KimangKhenng" target="_blank" rel="noopener noreferrer"
                            class="inline-block group">
                            <p
                                class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-tfd dark:group-hover:text-tfd transition-colors duration-300 underline decoration-gray-300 dark:decoration-gray-600 group-hover:decoration-tfd underline-offset-2">
                                {{ author }}
                                <svg class="inline-block w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </p>
                            <p v-if="authorTitle" class="text-sm text-gray-500 dark:text-gray-400">
                                {{ authorTitle }}
                            </p>
                        </a>
                    </div>
                </div>

                <!-- Optional CTA Buttons -->
                <div v-if="showCTA" class="flex flex-wrap gap-4 pt-4 justify-center">
                    <NuxtLink to="/articles"
                        class="px-6 py-3 bg-tfd hover:bg-tfd/90 text-white font-medium rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
                        {{ $t('read_articles') }}
                    </NuxtLink>
                    <NuxtLink to="/about-us"
                        class="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors duration-300 border border-gray-200 dark:border-gray-700">
                        {{ $t('about_us') }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
interface Image {
    src: string
    alt: string
}

// @ts-ignore
const props = defineProps({
    title: {
        type: String,
        default: 'Empowering Education Through Innovation'
    },
    description: {
        type: String,
        default: 'Transform your learning journey with cutting-edge courses designed to inspire, educate, and elevate your skills to new heights. Join thousands of learners who are already making a difference.'
    },
    author: {
        type: String,
        default: 'John Doe'
    },
    authorTitle: {
        type: String,
        default: 'CEO & Founder'
    },
    images: {
        type: Array as () => Image[],
        default: () => [
            {
                src: '~/assets/img/heros/tfd-front.jpg',
                alt: 'Students collaborating'
            }
        ]
    },
    showCTA: {
        type: Boolean,
        default: true
    }
})

// No need for manual carousel logic - UMarquee handles it automatically
</script>
