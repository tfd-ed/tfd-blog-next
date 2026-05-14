<template>
    <div class="group relative block h-80 sm:h-96">
        <!-- Dashed border background -->
        <span class="absolute inset-0 border-2 border-dashed border-gray-800 dark:border-gray-300 rounded-lg"></span>

        <!-- Main card with transform effect -->
        <div :class="[
            'relative flex h-full transform items-end border-2  rounded-lg transition-transform duration-300',
            'bg-white dark:bg-neutral-800',
            available
                ? 'border-gray-800 dark:border-gray-300 group-hover:-translate-x-2 group-hover:-translate-y-2'
                : 'border-gray-400 dark:border-gray-600'
        ]">

            <!-- Default view - visible when not hovering -->
            <div
                class="px-6 pb-6 pt-6 w-full transition-opacity duration-300 group-hover:absolute group-hover:opacity-0">
                <div class="flex items-center justify-between mb-4">
                    <div class="text-5xl sm:text-6xl">{{ icon }}</div>
                    <span v-if="badge" class="px-3 py-1 text-xs font-semibold rounded-full bg-tfd text-white">
                        {{ badge }}
                    </span>
                </div>

                <h2 class="mt-6 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {{ title }}
                </h2>

                <!-- Show coming soon indicator in default view -->
                <div v-if="!available" class="mt-4">
                    <span
                        class="inline-block px-4 py-2 bg-gray-200 dark:bg-neutral-700 text-gray-600 dark:text-gray-400 font-semibold rounded-lg">
                        Coming Soon
                    </span>
                </div>
            </div>

            <!-- Hover view - detailed information -->
            <div :class="[
                'absolute inset-0 p-6 sm:p-8 opacity-0 transition-opacity duration-300 overflow-y-auto',
                'group-hover:relative group-hover:opacity-100',
                'flex flex-col justify-between'
            ]">
                <div>
                    <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {{ title }}
                    </h3>

                    <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                        {{ description }}
                    </p>

                    <!-- Features List -->
                    <ul v-if="features && features.length > 0" class="space-y-2">
                        <li v-for="(feature, index) in features" :key="index"
                            class="flex items-start text-sm text-gray-600 dark:text-gray-400">
                            <svg class="w-4 h-4 text-tfd mr-2 flex-shrink-0 mt-0.5" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd" />
                            </svg>
                            {{ feature }}
                        </li>
                    </ul>

                    <!-- Stats in hover view -->
                    <div v-if="stats && stats.length > 0"
                        class="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
                        <div class="flex justify-around text-center">
                            <div v-for="(stat, index) in stats" :key="index">
                                <div class="text-sm font-bold text-gray-900 dark:text-white">{{ stat.value }}</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">{{ stat.label }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action text/button at bottom -->
                <div class="mt-6">
                    <button v-if="available" @click="handleClick"
                        class="text-base sm:text-lg font-bold text-gray-900 dark:text-white hover:text-tfd dark:hover:text-tfd transition-colors">
                        Try Now →
                    </button>
                    <p v-else class="text-base sm:text-lg font-bold text-gray-500 dark:text-gray-500">
                        Coming Soon
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Stat {
    value: string
    label: string
}

interface Props {
    icon: string
    title: string
    description: string
    badge?: string | null
    available: boolean
    features?: string[]
    stats?: Stat[] | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
    click: []
}>()

const handleClick = () => {
    if (props.available) {
        emit('click')
    }
}
</script>
