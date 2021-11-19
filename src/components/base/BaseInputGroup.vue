<template>
  <div :class="containerClasses" class="relative w-full text-left">
    <label
      v-if="label"
      :class="labelClasses"
      class="block text-sm not-italic font-medium  text-primary-800 whitespace-nowrap"
    >
      {{ label }}
      <span v-show="required" class="text-sm text-red-500"> *</span>
    </label>

    <div :class="inputContainerClasses">
      <slot></slot>
      <span v-if="error" class="block mt-0.5 text-sm text-red-500">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
// Props

const props = defineProps({
  contentLoading: {
    type: Boolean,
    default: false,
  },
  contentLoadClass: {
    type: String,
    default: 'w-16 h-5',
  },
  label: {
    type: String,
    default: '',
  },
  error: {
    type: [String, Boolean],
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
})
// Computed props
const containerClasses = computed(() => {
  if (props.variant === 'horizontal') {
    return 'grid md:grid-cols-12 items-center'
  }

  return ''
})

const labelClasses = computed(() => {
  if (props.variant === 'horizontal') {
    return 'relative pr-0 pt-1 mr-3 text-sm md:col-span-4'
  }

  return ''
})

const inputContainerClasses = computed(() => {
  if (props.variant === 'horizontal') {
    return 'col-span-8 md:col-start-5 md:col-ends-12'
  }

  return 'flex flex-col mt-1'
})
</script>
