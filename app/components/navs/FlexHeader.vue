<template>
    <header class="sticky top-0 z-[100] w-full py-2 bg-white dark:bg-neutral-900 backdrop-blur-md">
        <nav class="relative max-w-[66rem] w-full bg-white/95 backdrop-blur-md dark:bg-gray-900/95 border border-gray-200/50 dark:border-gray-700/50 rounded-[8px] py-3 ps-3 pe-2 md:ps-5 md:flex md:items-center md:justify-between md:py-0 mx-2 lg:mx-auto shadow-lg transition-colors duration-300"
            aria-label="Global">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <NuxtLink class="flex-none text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                    :to="localePath('/')">
                    <img class="h-10 rounded-md p-1" src="~/assets/img/tfd_logo.jpeg" alt="TFD Logo" />
                </NuxtLink>
                <!-- End Logo -->

                <!-- Mobile Essential Navigation (visible on mobile) -->
                <div class="flex md:hidden items-center gap-1.5">
                    <!-- Home -->
                    <NuxtLink :to="localePath('/')" :class="[
                        'flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all',
                        route.path === localePath('/')
                            ? 'bg-gray-200 dark:bg-gray-700 text-tfd'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    ]">
                        <UIcon name="i-lucide-home" class="w-4 h-4" />
                    </NuxtLink>

                    <!-- Articles -->
                    <NuxtLink :to="localePath('/articles')" :class="[
                        'flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all',
                        route.path.startsWith(localePath('/articles'))
                            ? 'bg-gray-200 dark:bg-gray-700 text-tfd'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    ]">
                        <UIcon name="i-lucide-newspaper" class="w-4 h-4" />
                    </NuxtLink>

                    <!-- Collaborate - Highlighted CTA -->
                    <NuxtLink :to="localePath('/collaborate')" :class="[
                        'flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all',
                        route.path.startsWith(localePath('/collaborate'))
                            ? 'bg-tfd text-white shadow-md'
                            : 'bg-tfd/10 text-tfd hover:bg-tfd hover:text-white'
                    ]">
                        <UIcon name="i-lucide-handshake" class="w-4 h-4" />
                    </NuxtLink>

                    <!-- Dark Mode Toggle -->
                    <div class="pl-1">
                        <DarkModeToggle />
                    </div>

                    <!-- Mobile Toggle Button for More Options -->
                    <button @click="toggleMobileMenu" type="button"
                        class="size-8 flex justify-center items-center text-sm font-semibold rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white disabled:opacity-50 disabled:pointer-events-none transition-colors duration-300"
                        aria-label="More options">
                        <svg v-if="!isMobileMenuOpen" class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                        </svg>
                        <svg v-else class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden md:block">
                <div class="flex flex-row items-center justify-end gap-x-7 ps-7">
                    <UNavigationMenu :items="navigationItems" color="neutral" variant="pill" :ui="{
                        link: 'text-base font-medium'
                    }" />

                    <div class="flex items-center gap-x-3">
                        <DarkModeToggle />
                        <!-- <div class="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                            <button @click="setLocale('en')" :class="[
                                'flex items-center space-x-1 px-2 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors',
                                locale === 'en'
                                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600'
                            ]">
                                <NuxtImg src="/images/flags/uk.png" alt="English" width="20" height="14"
                                    :provider="imageProvider" />
                                <span class="hidden sm:inline">{{ $t('english') }}</span>
                            </button>
                            <button @click="setLocale('km')" :class="[
                                'flex items-center space-x-1 px-2 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors',
                                locale === 'km'
                                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600'
                            ]">
                                <NuxtImg src="/images/flags/kh.png" alt="Khmer" width="20" height="14"
                                    :provider="imageProvider" />
                                <span class="hidden sm:inline">{{ $t('khmer') }}</span>
                            </button>
                        </div> -->
                        <language-switcher />
                    </div>
                </div>
            </div>


            <div v-show="isMobileMenuOpen"
                class="md:hidden overflow-hidden transition-all duration-300 basis-full grow mt-5">
                <div class="flex flex-col gap-y-4">
                    <!-- Secondary Navigation Links -->
                    <div class="flex flex-col gap-y-2">
                        <!-- Playrooms -->
                        <a href="https://ai.tfdevs.com" target="_blank"
                            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                            <UIcon name="i-lucide-rocket" class="w-5 h-5 text-tfd" />
                            <span>{{ t('playrooms') }}</span>
                            <UIcon name="i-lucide-external-link" class="w-4 h-4 ml-auto opacity-50" />
                        </a>

                        <!-- About Us -->
                        <NuxtLink :to="localePath('/about-us')" :class="[
                            'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                            route.path.startsWith(localePath('/about-us'))
                                ? 'bg-gray-200 dark:bg-gray-700 text-tfd'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        ]">
                            <UIcon name="i-lucide-info" class="w-5 h-5 text-tfd" />
                            <span>{{ t('about_us') }}</span>
                        </NuxtLink>
                    </div>

                    <!-- Settings Section -->
                    <div class="flex flex-col gap-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div
                            class="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                            {{ t('settings') }}
                        </div>
                        <div class="flex items-center justify-between px-4">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('language')
                                }}</span>
                            <language-switcher />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { locale, setLocale, t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

// Mobile menu state
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu on route change
watch(() => route.path, () => {
    isMobileMenuOpen.value = false
})

// Compute image provider based on environment
const imageProvider = 'ipx' as const

const navigationItems = computed<NavigationMenuItem[]>(() => {
    const currentPath = route.path

    return [
        {
            label: t('home'),
            to: localePath('/'),
            active: currentPath === localePath('/')
        },
        // {
        //     label: t('course'),
        //     to: '/courses',
        //     active: currentPath.startsWith('/courses')
        // },
        {
            label: t('articles'),
            to: localePath('/articles'),
            active: currentPath.startsWith(localePath('/articles'))
        },
        // {
        //     label: t('projects'),
        //     to: '/projects',
        //     active: currentPath.startsWith('/projects')
        // },
        // {
        //     label: t('playrooms'),
        //     to: '/playrooms',
        //     active: currentPath.startsWith('/playrooms')
        // },
        {
            label: t('playrooms'),
            to: 'https://ai.tfdevs.com',
            target: '_blank',
            // trailingIcon: 'i-lucide-external-link'
        },
        // {
        //     label: t('services'),
        //     to: '/services',
        //     active: currentPath.startsWith('/services')
        // },
        {
            label: t('collaborate'),
            to: localePath('/collaborate'),
            active: currentPath.startsWith(localePath('/collaborate'))
        },
        {
            label: t('about_us'),
            to: localePath('/about-us'),
            active: currentPath.startsWith(localePath('/about-us'))
        }
    ]
})
</script>