<template>
    <footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 border-t border-gray-700">
        <div class="max-w-7xl mx-auto px-6 py-12 lg:py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                <!-- Brand Section -->
                <div class="space-y-5">
                    <NuxtLink :to="localePath('/')" class="inline-block group">
                        <img src="~/assets/img/tfd_logo.jpeg"
                            class="w-14 h-14 rounded-lg shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
                            alt="TFD Logo" />
                    </NuxtLink>
                    <div>
                        <a href="mailto:info@tfdevs.com"
                            class="inline-flex items-center gap-2 text-gray-400 hover:text-tfd transition-colors group">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span class="text-sm group-hover:underline">info@tfdevs.com</span>
                        </a>
                        <!-- <h3 class="text-xl font-bold bg-gradient-to-r from-tfd to-tfd/70 bg-clip-text text-transparent">
                            TFD
                        </h3> -->
                        <!-- <p class="text-gray-400 font-medium">Teaching For Devs</p> -->
                    </div>

                </div>

                <!-- Quick Links Section -->
                <div class="space-y-5">
                    <h4 class="text-lg font-bold uppercase tracking-wider text-white">{{ t('more') }}</h4>
                    <nav class="flex flex-col space-y-3">
                        <NuxtLink :to="localePath('about-us')"
                            class="capitalize text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group hover:cursor-pointer">
                            <span
                                class="w-1.5 h-1.5 rounded-full bg-tfd/50 group-hover:bg-tfd transition-colors"></span>
                            {{ t('about_us') }}
                        </NuxtLink>
                        <NuxtLink :to="localePath('contact-us')"
                            class="capitalize text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group hover:cursor-pointer">
                            <span
                                class="w-1.5 h-1.5 rounded-full bg-tfd/50 group-hover:bg-tfd transition-colors"></span>
                            {{ t('contact') }}
                        </NuxtLink>
                        <NuxtLink :to="localePath('tos')"
                            class="capitalize text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group hover:cursor-pointer">
                            <span
                                class="w-1.5 h-1.5 rounded-full bg-tfd/50 group-hover:bg-tfd transition-colors"></span>
                            {{ t('term_of_service') }}
                        </NuxtLink>
                        <NuxtLink :to="localePath('privacy')"
                            class="capitalize text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group hover:cursor-pointer">
                            <span
                                class="w-1.5 h-1.5 rounded-full bg-tfd/50 group-hover:bg-tfd transition-colors"></span>
                            {{ t('privacy') }}
                        </NuxtLink>
                    </nav>
                </div>

                <!-- Social Section -->
                <div class="space-y-5">
                    <h4 class="text-lg font-bold uppercase tracking-wider text-white">{{ t('social') }}</h4>
                    <div class="flex flex-wrap gap-3">
                        <a href="https://t.me/tfdTech" target="_blank" rel="noopener noreferrer"
                            class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-tfd border border-gray-700 hover:border-tfd transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-tfd/20">
                            <img class="w-5 h-5" src="/images/icons/telegram-svgrepo-com.svg" alt="Telegram" />
                        </a>
                        <a :href="config.YOUTUBE_URL" target="_blank" rel="noopener noreferrer"
                            class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-red-600 border border-gray-700 hover:border-red-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-600/20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                class="fill-current">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                            </svg>
                        </a>
                        <a :href="config.FACEBOOK_URL" target="_blank" rel="noopener noreferrer"
                            class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-blue-600 border border-gray-700 hover:border-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-600/20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                class="fill-current">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>
                        <a :href="config.INSTAGRAM_URL" target="_blank" rel="noopener noreferrer"
                            class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 border border-gray-700 hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-600/20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30"
                                class="fill-current">
                                <path
                                    d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
                            </svg>
                        </a>
                        <a :href="config.GITHUB_URL" target="_blank" rel="noopener noreferrer"
                            class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-700/20">
                            <img class="w-5 h-5" src="/images/icons/github.png" alt="Github" />
                        </a>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="mt-12 pt-8 border-t border-gray-700/50">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-sm text-gray-400">
                        © {{ new Date().getFullYear() }} TFD. All rights reserved.
                    </p>
                    <!-- <p class="text-sm text-gray-500">
                        Made with <span class="text-red-500">♥</span> for developers
                    </p> -->
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
const config = useRuntimeConfig().public
const { t } = useI18n()
const localePath = useLocalePath()
</script>
