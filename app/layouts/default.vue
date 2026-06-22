<template>
    <div class="bg-white dark:bg-neutral-900 min-h-screen transition-colors duration-300">
        <FlexHeader />
        <main class="w-full">
            <slot />
        </main>
        <FlexFooter />
    </div>
</template>