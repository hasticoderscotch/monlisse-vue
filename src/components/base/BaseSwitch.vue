<template>
  <SwitchGroup>
    <div class="flex flex-row items-start">
      <SwitchLabel v-if="labelLeft" class="mr-4">{{ labelLeft }}</SwitchLabel>

      <Switch
        v-model="enabled"
        :class="enabled ? 'bg-primary-500' : 'bg-primary-400'"
        class="relative inline-flex items-center h-6 transition-colors rounded-full  w-11 focus:outline-none focus:ring-primary-500"
        v-bind="$attrs"
      >
        <span
          :class="enabled ? 'translate-x-6' : 'translate-x-1'"
          class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full "
        />
      </Switch>

      <SwitchLabel v-if="labelRight" class="ml-4">{{ labelRight }}</SwitchLabel>
    </div>
  </SwitchGroup>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

// Props

const props = defineProps({
  labelLeft: {
    type: String,
    default: '',
  },
  labelRight: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
})

// Emit
const emit = defineEmits(['update:modelValue'])

// Computed Props

const enabled = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
