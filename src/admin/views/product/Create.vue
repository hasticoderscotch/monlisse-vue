<template>
  <BasePage>
    <BasePageHeader :title="pageTitle">
      <BaseBreadcrumb>
        <BaseBreadcrumbItem title="Home" to="/admin/dashboard" />
        <BaseBreadcrumbItem title="Products" to="/admin/products" />
        <BaseBreadcrumbItem :title="pageTitle" to="#" active />
      </BaseBreadcrumb>
    </BasePageHeader>

    <div class="grid grid-cols-12">
      <div class="col-span-12 md:col-span-6">
        <form action="submit" @submit.prevent="submitData">
          <BaseCard class="w-full mt-6">
            <BaseInputGroup label="Product Images">
              <BaseFileUploader />
            </BaseInputGroup>

            <BaseInputGroup label="Name" class="my-4">
              <BaseInput v-model="formData.name" @input="slug" />
            </BaseInputGroup>

            <BaseInputGroup label="Title">
              <BaseInput v-model="formData.title" />
            </BaseInputGroup>

            <BaseInputGroup label="Description" class="my-4">
              <BaseTextarea v-model="formData.description" />
            </BaseInputGroup>

            <BaseInputGroup label="Select Category">
              <BaseSelectInput
                v-model="formData.categoryId"
                :options="categoryStore.categories"
                label-key="name"
                value-prop="_id"
              />
            </BaseInputGroup>

            <BaseInputGroup label="Quantity" class="my-4">
              <BaseInput v-model="formData.quantity" />
            </BaseInputGroup>

            <BaseInputGroup label="Price">
              <BaseInput v-model="formData.price" />
            </BaseInputGroup>

            <BaseInputGroup label="isActive" class="my-4">
              <BaseSwitch v-model="formData.isActive" />
            </BaseInputGroup>

            <BaseButton type="submit" :loading="isLoading" class="mt-6 mb-6">
              <template #left="slotProps">
                <SaveIcon v-if="!isLoading" :class="slotProps.class" />
              </template>
              {{ isEdit ? 'Update' : 'Save' }}
            </BaseButton>
          </BaseCard>
        </form>
      </div>
    </div>
  </BasePage>
</template>
<script setup>
import { SaveIcon } from '@heroicons/vue/outline'
import { required, maxLength, helpers } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { computed, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCategoryStore } from '../../../store/category'
import { useProductStore } from '../../../store/product'
import { useNotificationStore } from '../../../store/notification'

// Local State

let formData = reactive({
  name: null,
  title: null,
  description: null,
  categoryId: null,
  quantity: null,
  price: null,
  slug: null,
  isActive: false,
})

const isLoading = ref(false)

// Router

const route = useRoute()
const router = useRouter()

// Store

const categoryStore = useCategoryStore()
const productStore = useProductStore()
const notificationStore = useNotificationStore()

// Created

categoryStore.fetchCategories()

// Computed

const isEdit = computed(() => route.name === 'products.edit')

const pageTitle = computed(() =>
  isEdit.value ? 'Edit Product' : 'New Product'
)

// Validation

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Field is required', required),
    },

    title: {
      required: helpers.withMessage('Field is required', required),
    },

    description: {
      required: helpers.withMessage('Field is required', required),
      maxLength: helpers.withMessage(
        'Description should not be greater than 255 characters.',
        maxLength(65000)
      ),
    },

    categoryId: {
      required: helpers.withMessage('Field is required', required),
    },

    quantity: {
      required: helpers.withMessage('Field is required', required),
    },

    price: {
      required: helpers.withMessage('Field is required', required),
    },

    isActive: {
      required: helpers.withMessage('Field is required', required),
    },
  }
})

const v$ = useVuelidate(rules, formData)

// Methods

if (isEdit.value) {
  loadData()
}

async function loadData() {
  await productStore.fetchProducts()

  let res = productStore.products.find((product) => {
    if (product._id == route.params.id) {
      return product
    }
  })

  Object.assign(formData, res)
}

function slug(e) {
  const a = e.target.value
  console.log(a, 'a')

  const b = a
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

  formData.slug = b

  console.log(formData.slug, 'formData.slug')
}

function submitData() {
  v$.value.$touch()

  if (v$.value.$invalid) {
    return true
  }

  let data = {
    ...formData,
  }

  isLoading.value = true

  if (isEdit.value) {
    productStore
      .updateProduct(route.params.id, data)
      .then((res) => {
        if (res.data.data) {
          isLoading.value = false
          notificationStore.showNotification({
            type: 'success',
            message: 'Product updated successfully.',
          })
          router.push('/admin/products')
        } else {
          notificationStore.showNotification({
            type: 'error',
            message: res.data.message,
          })
        }
      })
      .catch((err) => {
        if (err) {
          isLoading.value = false
          notificationStore.showNotification({
            type: 'error',
            message: err.response.data.message,
          })
        }
      })
  } else {
    productStore
      .addProduct(data)
      .then((res) => {
        if (res.data.data) {
          isLoading.value = false
          notificationStore.showNotification({
            type: 'success',
            message: 'Product created successfully.',
          })
          router.push('/admin/products')
        } else {
          notificationStore.showNotification({
            type: 'error',
            message: res.data.message,
          })
        }
      })
      .catch((err) => {
        if (err) {
          isLoading.value = false

          notificationStore.showNotification({
            type: 'error',
            message: err.response.data.message,
          })
        }
      })
  }
}
</script>
