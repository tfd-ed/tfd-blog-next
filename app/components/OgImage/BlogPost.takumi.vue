<script setup>
defineProps({
  title: { type: String, required: false, default: "Blog Post Title" },
  author: { type: String, required: false, default: "TFDevs" },
  date: { type: String, required: false, default: "" },
});
</script>

<template>
  <div
    style="font-family: 'Google Sans', sans-serif; color: #111111; background: #ecf0f1; width: 100%; height: 100%; display: flex; flex-direction: column; padding: 60px; justify-content: space-between; position: relative; overflow: hidden;">

    <!-- Top accent bar -->
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 7px; background: #e74c3c;" />

    <!-- Header -->
    <div style="display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 1;">
      <div style="display: flex; flex-direction: column; gap: 5px;">
        <div style="font-size: 27px; font-weight: 700; color: #e74c3c; font-family: 'Google Sans', sans-serif;">
          TFDevs
        </div>
        <div style="font-size: 18px; color: rgba(0,0,0,0.45); font-family: 'Google Sans', sans-serif;">
          tfdevs.com
        </div>
      </div>
      <!-- TFD Logo -->
      <img src="/assets/img/tfd_logo.jpeg" alt="TFDevs" style="width: 88px; height: 88px; object-fit: cover;" />
    </div>

    <!-- Title -->
    <div
      style="flex: 1; display: flex; flex-direction: column; justify-content: center; overflow: hidden; padding: 36px 0; position: relative; z-index: 1;">
      <h1
        style="font-size: 66px; font-weight: 700; line-height: 1.22; margin: 0; color: #111111; overflow: hidden; max-height: 264px; font-family: 'Google Sans', sans-serif;">
        {{ title }}
      </h1>
    </div>

    <!-- Footer: author + date + label -->
    <div style="display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 1;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="width: 5px; height: 52px; background: #e74c3c; border-radius: 3px; flex-shrink: 0;" />
        <div style="display: flex; flex-direction: column; gap: 5px;">
          <span style="font-size: 24px; font-weight: 600; color: #111111; font-family: 'Google Sans', sans-serif;">{{
            author }}</span>
          <span v-if="date" style="font-size: 17px; color: rgba(0,0,0,0.45); font-family: 'Google Sans', sans-serif;">{{
            date
          }}</span>
        </div>
      </div>
      <div
        style="font-size: 17px; font-weight: 700; color: #e74c3c; letter-spacing: 3px; text-transform: uppercase; font-family: 'Google Sans', sans-serif; border: 2px solid #e74c3c; padding: 6px 16px; border-radius: 6px;">
        Article
      </div>
    </div>

  </div>
</template>