<template>
    <div class="bg-white dark:bg-neutral-900 min-h-screen flex flex-col transition-colors duration-300">
        <FlexHeader />
        <main class="flex-1 relative w-full">
            <slot />
        </main>
        <FlexFooter />
    </div>
</template>