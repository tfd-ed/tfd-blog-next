<script setup>
defineProps({
  title: { type: String, required: false, default: "Blog Post Title" },
  author: { type: String, required: false, default: "TFDevs" },
  date: { type: String, required: false, default: "" },
});
</script>

<template>
  <div class="w-full h-full flex flex-col p-[60px] justify-between"
    style="font-family: 'Google Sans', sans-serif; color: white; background: #0b1120;">

    <!-- Top accent bar -->
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 5px; background: #dc2626;" />

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <div class="text-[26px] font-bold" style="color: #dc2626; font-family: 'Google Sans', sans-serif;">
          Teaching For Development
        </div>
        <div class="text-[18px]" style="color: rgba(255,255,255,0.45); font-family: 'Google Sans', sans-serif;">
          tfdevs.com
        </div>
      </div>
      <!-- TFD Logo — top-right corner -->
      <img src="/assets/img/tfd_logo.jpeg" alt="TFDevs"
        style="width: 72px; height: 72px; border-radius: 50%; object-fit: cover; border: 2px solid #dc2626;" />
    </div>

    <!-- Title -->
    <div
      style="flex: 1; display: flex; flex-direction: column; justify-content: center; overflow: hidden; padding: 32px 0;">
      <h1
        style="font-size: 68px; font-weight: 600; line-height: 1.2; margin: 0; color: white; overflow: hidden; max-height: 256px; font-family: 'Google Sans', sans-serif;">
        {{ title }}
      </h1>
    </div>

    <!-- Footer: author + date -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div style="width: 4px; height: 48px; background: #dc2626; border-radius: 2px; flex-shrink: 0;" />
        <div class="flex flex-col gap-1">
          <span style="font-size: 24px; font-weight: 500; color: white; font-family: 'Google Sans', sans-serif;">{{
            author }}</span>
          <span v-if="date"
            style="font-size: 18px; color: rgba(255,255,255,0.45); font-family: 'Google Sans', sans-serif;">{{ date
            }}</span>
        </div>
      </div>
      <div style="font-size: 20px; color: rgba(255,255,255,0.3); font-family: 'Google Sans', sans-serif;">
        Article
      </div>
    </div>

  </div>
</template>