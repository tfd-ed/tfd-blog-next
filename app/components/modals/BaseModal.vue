<template>
  <UModal v-model="isOpen" :title="title" :description="description" :dismissible="dismissible" :fullscreen="fullscreen"
    :overlay="overlay" :transition="transition" :close="close" :close-icon="closeIcon" :ui="ui"
    @close:prevent="$emit('close:prevent')" @after:enter="$emit('after:enter')" @after:leave="$emit('after:leave')">
    <!-- Trigger slot - button or element that opens the modal -->
    <slot name="trigger" :open="openModal" :close="closeModal" :toggle="toggleModal" />

    <!-- Header slot - custom header content -->
    <template v-if="$slots.header" #header="{ close }">
      <slot name="header" :close="close" />
    </template>

    <!-- Title slot - custom title content -->
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <!-- Description slot - custom description content -->
    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>

    <!-- Actions slot - custom header actions -->
    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>

    <!-- Close slot - custom close button -->
    <template v-if="$slots.close" #close="{ close, ui }">
      <slot name="close" :close="close" :ui="ui" />
    </template>

    <!-- Body slot - main content -->
    <template v-if="$slots.body" #body="{ close }">
      <slot name="body" :close="close" :submit="handleSubmit" />
    </template>

    <!-- Footer slot - footer content with actions -->
    <template v-if="$slots.footer" #footer="{ close }">
      <slot name="footer" :close="close" :submit="handleSubmit" />
    </template>

    <!-- Content slot - full content override -->
    <template v-if="$slots.content" #content="{ close }">
      <slot name="content" :close="close" :submit="handleSubmit" />
    </template>
  </UModal>
</template>

<script setup lang="ts">

// Props interface
interface Props {
  // Modal state
  modelValue?: boolean
  defaultOpen?: boolean

  // Modal content
  title?: string
  description?: string

  // Modal behavior
  dismissible?: boolean
  fullscreen?: boolean
  overlay?: boolean
  transition?: boolean
  modal?: boolean

  // Modal appearance
  close?: boolean | object
  closeIcon?: string
  ui?: object

  // Form handling
  loading?: boolean
  submitOnEnter?: boolean
}

// Define props with defaults
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  dismissible: false,
  fullscreen: false,
  overlay: true,
  transition: true,
  modal: true,
  close: true,
  submitOnEnter: false,
  loading: false
})

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'open': []
  'close': [value: boolean]
  'submit': []
  'close:prevent': []
  'after:enter': []
  'after:leave': []
}>()

// Computed for v-model support
const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emit('update:modelValue', value)
    if (value) {
      emit('open')
    } else {
      emit('close')
    }
  }
})

// Modal control methods
const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

const toggleModal = () => {
  isOpen.value = !isOpen.value
}

// Submit handler
const handleSubmit = () => {
  emit('submit')
}

// Keyboard event handling
const handleKeydown = (event: KeyboardEvent) => {
  if (props.submitOnEnter && event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    handleSubmit()
  }
}

// Add keyboard listener when modal is open
watch(isOpen, (open) => {
  if (open && props.submitOnEnter) {
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// Expose methods for parent components
defineExpose({
  open: openModal,
  close: closeModal,
  toggle: toggleModal
})
</script>