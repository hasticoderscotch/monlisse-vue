<template>
  <div class="flex flex-wrap justify-between">
    <div>
      <h3 class="text-2xl font-bold text-left text-black">
        {{ title }}
      </h3>
      <slot />
    </div>
    <div class="flex items-center">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

let name = 'BaseHeaderPage'

// Props

const props = defineProps({
  title: {
    type: String,
    default: null,
    required: true,
  },
})

console.log(props, name)
</script>
