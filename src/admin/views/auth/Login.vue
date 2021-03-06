<template>
  <div class="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
        Admin Login
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form
          class="space-y-6"
          action="#"
          @submit.prevent="validateBeforeSubmit"
        >
          <BaseInputGroup
            :error="v$.email.$error && v$.email.$errors[0].$message"
            label="Email"
            class="mb-4"
            required
          >
            <BaseInput
              v-model="formData.email"
              :invalid="v$.email.$error"
              focus
              type="email"
              name="email"
              @input="v$.email.$touch()"
            />
          </BaseInputGroup>

          <BaseInputGroup
            :error="v$.password.$error && v$.password.$errors[0].$message"
            label="Password"
            class="mb-4"
            required
          >
            <BaseInput
              v-model="formData.password"
              :invalid="v$.password.$error"
              type="password"
              name="password"
              @input="v$.password.$touch()"
            />
          </BaseInputGroup>

          <BaseButton
            :loading="isLoading"
            type="submit"
            class="flex justify-center w-full"
          >
            Sign in
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, computed } from 'vue'
import { required, email, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useNotificationStore } from '../../../store/notification.js'
import { useAuthStore } from '../../../store/auth.js'
import { useRouter } from 'vue-router'

//  Stores

const notificationStore = useNotificationStore()
const authStore = useAuthStore()

// Data Variable

const formData = reactive({
  email: '',
  password: '',
  role: 'admin',
})
const isLoading = ref(false)

// Router

const router = useRouter()

// Validation

const rules = {
  email: {
    required: helpers.withMessage('Field is required', required),
    email: helpers.withMessage('Invalid Email', email),
  },
  password: {
    required: helpers.withMessage('Field is required', required),
  },
}

const v$ = useVuelidate(
  rules,
  computed(() => formData)
)

// Methods

async function validateBeforeSubmit() {
  v$.value.$touch()
  if (v$.value.$invalid) {
    return true
  }

  isLoading.value = true
  try {
    await authStore.login(formData).then((res) => {
      if (res.data) {
        isLoading.value = false
        router.push('/admin/dashboard')
        notificationStore.showNotification({
          type: 'success',
          message: 'Logged in successfully.',
        })
      } else {
        notificationStore.showNotification({
          type: 'error',
          message: res.data.message,
        })
      }
    })
  } catch (error) {
    notificationStore.showNotification({
      type: 'error',
      message: error.response.data.message,
    })
    isLoading.value = false
  }
}
</script>
