<template>
  <div class="relative inline-block group focus:outline-none focus:ring">
    <span
      class="rounded-md absolute inset-0 transition-transform translate-x-0 translate-y-0 group-hover:translate-x-1.5 group-hover:translate-y-1.5"
      :class="color"></span>

    <UButton :label="$t(text)" :icon="icon" :trailing-icon="trailingIcon" variant="solid" color="black" :ui="{
      label: 'text-white font-bold uppercase',
      leadingIcon: 'text-white',
      trailingIcon: 'text-white'
    }" class="relative border-2 border-black" @click="handleClick">
    </UButton>
  </div>
</template>

<script setup lang="ts">
defineProps(['text', 'color', 'icon', 'trailingIcon'])

const emit = defineEmits(['onClick'])

const handleClick = () => {
  emit('onClick')
}

</script>
