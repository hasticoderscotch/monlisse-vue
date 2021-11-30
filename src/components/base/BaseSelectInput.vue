<template>
  <div>
    <Listbox
      v-model="selectedValue"
      as="div"
      v-bind="{
        ...$attrs,
      }"
    >
      <ListboxLabel
        v-if="label"
        class="block text-sm not-italic font-medium text-primary-800 mb-0.5"
      >
        {{ label }}
      </ListboxLabel>

      <div class="relative">
        <!-- Select Input button -->
        <ListboxButton
          class="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default  focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        >
          <span v-if="getValue(selectedValue)" class="block truncate">
            {{ getValue(selectedValue) }}
          </span>
          <span v-else-if="placeholder" class="block text-gray-400 truncate">
            {{ placeholder }}
          </span>
          <span v-else class="block text-gray-400 truncate">
            Please select an option
          </span>

          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none "
          >
            <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg  max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="option in options"
              v-slot="{ active, selected }"
              :key="option.id"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active ? 'text-white bg-primary-600' : 'text-gray-900',
                  'cursor-default select-none relative py-2 pl-3 pr-9',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-semibold' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ getValue(option) }}
                </span>

                <span
                  v-if="selected"
                  :class="[
                    active ? 'text-white' : 'text-primary-600',
                    'absolute inset-y-0 right-0 flex items-center pr-4',
                  ]"
                >
                  <CheckIcon class="w-5 h-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
            <slot />
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

// Props

const props = defineProps({
  contentLoading: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number, Boolean, Object, Array],
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  labelKey: {
    type: [String],
    default: 'label',
  },
  valueProp: {
    type: String,
    default: null,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
})

// emits

const emit = defineEmits(['update:modelValue'])

// Variable declaration

let selectedValue = ref(props.modelValue)

//  Methods

function isObject(val) {
  return typeof val === 'object' && val !== null
}

function getValue(val) {
  if (isObject(val)) {
    return val[props.labelKey]
  }
  return val
}

// Watcher

watch(
  () => props.modelValue,
  () => {
    if (props.valueProp && props.options.length) {
      selectedValue.value = props.options.find((val) => {
        if (val[props.valueProp]) {
          return val[props.valueProp] === props.modelValue
        }
      })
    } else {
      selectedValue.value = props.modelValue
    }
  }
)

watch(selectedValue, (val) => {
  if (props.valueProp) {
    emit('update:modelValue', val[props.valueProp])
  } else {
    emit('update:modelValue', val)
  }
})
</script>
