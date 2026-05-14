<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
// Get the other language (not the current one)
const otherLocale = computed(() => {
    return (locales.value as any[]).find(i => i.code !== locale.value)
})

const currentLocaleName = computed(() => {
    return (locales.value as any[]).find(i => i.code === locale.value)?.name || ''
})
</script>

<template>
    <UButton v-if="otherLocale" :to="switchLocalePath(otherLocale.code)" color="neutral" variant="ghost" size="sm"
        class="rounded-full" :aria-label="`Switch to ${t(otherLocale.name.toLowerCase())}`">
        <template #leading>
            <UIcon name="i-lucide-languages" class="size-4" />
        </template>
        <span class="hidden sm:inline">{{ t(otherLocale.name.toLowerCase()) }}</span>
    </UButton>
</template>
