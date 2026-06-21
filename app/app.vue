<template>
  <UApp>
    <NuxtLayout>
      <!-- Add key to force proper re-render on route change for iOS Safari/webview compatibility -->
      <NuxtPage :key="$route.fullPath" />
    </NuxtLayout>
  </UApp>
</template>
