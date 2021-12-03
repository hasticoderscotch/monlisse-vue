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
              <BaseFileUploader
                :preview-image="productImagesUrls"
                multiple
                @change="onFileInputChange"
              />
            </BaseInputGroup>

            <BaseInputGroup
              label="Name"
              required
              class="my-4"
              :error="v$.name.$error && v$.name.$errors[0].$message"
            >
              <BaseInput
                v-model="formData.name"
                :invalid="v$.name.$error"
                @input="slug"
              />
            </BaseInputGroup>

            <BaseInputGroup
              label="Title"
              required
              :error="v$.title.$error && v$.title.$errors[0].$message"
            >
              <BaseInput
                v-model="formData.title"
                :invalid="v$.title.$error"
                @input="v$.title.$touch()"
              />
            </BaseInputGroup>

            <BaseInputGroup
              label="Description"
              class="my-4"
              required
              :error="
                v$.description.$error && v$.description.$errors[0].$message
              "
            >
              <BaseTextarea
                v-model="formData.description"
                :invalid="v$.description.$error"
                @input="v$.description.$touch()"
              />
            </BaseInputGroup>

            <BaseInputGroup
              label="Select Category"
              required
              :error="v$.categoryId.$error && v$.categoryId.$errors[0].$message"
            >
              <BaseSelectInput
                v-model="formData.categoryId"
                :options="categoryStore.categories"
                label-key="name"
                value-prop="_id"
                :invalid="v$.categoryId.$error"
                @input="v$.categoryId.$touch()"
              />
            </BaseInputGroup>

            <BaseInputGroup
              label="Quantity"
              class="my-4"
              required
              :error="v$.quantity.$error && v$.quantity.$errors[0].$message"
            >
              <BaseInput
                v-model="formData.quantity"
                :invalid="v$.quantity.$error"
                @input="v$.quantity.$touch()"
              />
            </BaseInputGroup>

            <BaseInputGroup
              label="Price"
              required
              :error="v$.price.$error && v$.price.$errors[0].$message"
            >
              <BaseInput
                v-model="formData.price"
                :invalid="v$.price.$error"
                @input="v$.price.$touch()"
              />
            </BaseInputGroup>

            <BaseInputGroup
              label="isActive"
              required
              :error="v$.isActive.$error && v$.isActive.$errors[0].$message"
              class="my-4"
            >
              <BaseSwitch
                v-model="formData.isActive"
                :invalid="v$.isActive.$error"
                @input="v$.isActive.$touch()"
              />
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

let productImagesUrls = reactive([])
let imageFileBlobs = reactive([])

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

function onFileInputChange(fileName, fileList) {
  imageFileBlobs = fileList

  console.log(imageFileBlobs, 'imagefileblob')
}

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
  const b = a
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
  formData.slug = b
  v$.value.name.$touch()
}

async function submitData() {
  v$.value.$touch()

  if (v$.value.$invalid) {
    return true
  }

  // Upload image
  const imgData = new FormData()

  for (const i of Object.keys(imageFileBlobs)) {
    imgData.append('productImages', imageFileBlobs[i])
  }

  await productStore.uploadProductImages(imgData).then((res) => {
    for (const i of Object.keys(res.data.data)) {
      productImagesUrls.push(res.data.data[i].path)
    }
  })

  isLoading.value = true

  let data = {
    ...formData,
    productImages: productImagesUrls,
  }

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
