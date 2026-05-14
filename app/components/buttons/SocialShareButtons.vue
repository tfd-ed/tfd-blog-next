<script setup lang="ts">
const { t } = useI18n()

const copied = ref(false)

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href)
        copied.value = true
        setTimeout(() => { copied.value = false }, 2000)
    } catch {
        // clipboard not available
    }
}
</script>

<template>
    <div class="flex flex-wrap items-center gap-3">
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ t('share_this_article') }}:</span>
        <div class="flex flex-wrap items-center gap-2">
            <SocialShare v-for="network in ['facebook', 'x', 'linkedin', 'telegram']" :key="network" :network="network"
                :styled="true" :label="false" class="!rounded-none transition-transform duration-200 hover:scale-110" />
            <button @click="copyLink"
                class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border transition-all duration-200"
                :class="copied
                    ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-tfd hover:text-tfd'">
                <svg v-if="!copied" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ copied ? t('link_copied') : t('copy_link') }}
            </button>
        </div>
    </div>
</template>