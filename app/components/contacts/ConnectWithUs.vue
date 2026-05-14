<template>
    <div class="max-w-7xl mx-auto">
        <!-- Title -->
        <h2
            class="text-center text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-8 uppercase tracking-wide">
            {{ $t('join_our_social_networks') }}
        </h2>

        <!-- Social Media Icons -->
        <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <!-- Facebook -->
            <a :href="socialLinks.facebook" target="_blank" rel="noopener noreferrer"
                class="inline-block transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110 active:scale-105 cursor-pointer"
                aria-label="Facebook">
                <img src="/socials/facebook.png" alt="Facebook" class="w-8 h-8 md:w-10 md:h-10 block" />
            </a>

            <!-- LinkedIn -->
            <a :href="socialLinks.linkedin" target="_blank" rel="noopener noreferrer"
                class="inline-block transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110 active:scale-105 cursor-pointer"
                aria-label="LinkedIn">
                <img src="/socials/linkedin.png" alt="LinkedIn" class="w-8 h-8 md:w-10 md:h-10 block" />
            </a>

            <!-- Instagram -->
            <a :href="socialLinks.instagram" target="_blank" rel="noopener noreferrer"
                class="inline-block transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110 active:scale-105 cursor-pointer"
                aria-label="Instagram">
                <img src="/socials/Instagram_icon.webp" alt="Instagram" class="w-8 h-8 md:w-10 md:h-10 block" />
            </a>

            <!-- Telegram -->
            <a :href="socialLinks.telegram" target="_blank" rel="noopener noreferrer"
                class="inline-block transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110 active:scale-105 cursor-pointer"
                aria-label="Telegram">
                <img src="/socials/telegram.png" alt="Telegram" class="w-8 h-8 md:w-10 md:h-10 block" />
            </a>

            <!-- YouTube -->
            <a :href="socialLinks.youtube" target="_blank" rel="noopener noreferrer"
                class="inline-block transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110 active:scale-105 cursor-pointer"
                aria-label="YouTube">
                <img src="/socials/youtube.webp" alt="YouTube" class=" h-10  md:h-10 block" />
            </a>

            <!-- GitHub -->
            <a :href="socialLinks.github" target="_blank" rel="noopener noreferrer"
                class="inline-block transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110 active:scale-105 cursor-pointer"
                aria-label="GitHub">
                <img src="/socials/github.png" alt="GitHub" class=" h-10  md:h-10 block" />
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    socialLinks?: {
        facebook?: string
        linkedin?: string
        instagram?: string
        telegram?: string
        youtube?: string
        github?: string
    }
}

const props = withDefaults(defineProps<Props>(), {
    socialLinks: () => ({
        facebook: 'https://www.facebook.com/teachingfordevs',
        linkedin: 'https://www.linkedin.com/company/teachingfordevs',
        instagram: 'https://www.instagram.com/teachingfordevs',
        telegram: 'https://t.me/teachingfordevs',
        youtube: 'https://www.youtube.com/@teachingfordevs',
        github: 'https://github.com/teachingfordevs'
    })
})
</script>
