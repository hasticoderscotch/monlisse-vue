<template>
  <BasePage>
    <BasePageHeader :title="pageTitle">
      <BaseBreadcrumb>
        <BaseBreadcrumbItem title="Home" to="/admin/dashboard" />
        <BaseBreadcrumbItem title="Categories" to="/admin/categories" />
        <BaseBreadcrumbItem :title="pageTitle" to="#" active />
      </BaseBreadcrumb>
    </BasePageHeader>

    <div class="grid grid-cols-12">
      <div class="col-span-12 md:col-span-6">
        <form action="" @submit.prevent="submitData">
          <BaseCard class="w-full mt-6">
            <BaseInputGroup label="Name">
              <BaseInput v-model="formData.name" />
            </BaseInputGroup>

            <BaseInputGroup label="Description" class="mt-4">
              <BaseTextarea v-model="formData.description" />
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
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCategoryStore } from '../../../store/category'
import { useNotificationStore } from '../../../store/notification'
import { SaveIcon } from '@heroicons/vue/outline'

// Local State

let formData = reactive({
  name: '',
  description: '',
})

const isLoading = ref(false)

// Store

const categoryStore = useCategoryStore()
const notificationStore = useNotificationStore()

// Router

const route = useRoute()
const router = useRouter()

// Computed

const isEdit = computed(() => route.name === 'categories.edit')

const pageTitle = computed(() =>
  isEdit.value ? 'Edit Category' : 'New Category'
)

// Methods

if (isEdit.value) {
  loadData()
}

async function loadData() {
  await categoryStore.fetchCategory()

  let res = categoryStore.categories.find((category) => {
    if (category._id == route.params.id) {
      return category
    }
  })

  Object.assign(formData, res)
}

function submitData() {
  isLoading.value = true
  if (isEdit.value) {
    categoryStore
      .updateCategory(route.params.id, formData)
      .then((res) => {
        if (res.data.data) {
          isLoading.value = false
          notificationStore.showNotification({
            type: 'success',
            message: 'Category updated successfully.',
          })
          router.push('/admin/categories')
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
    categoryStore
      .addCategory(formData)
      .then((res) => {
        if (res.data.data) {
          isLoading.value = false
          notificationStore.showNotification({
            type: 'success',
            message: 'Category created successfully.',
          })
          router.push('/admin/categories')
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

console.log(pageTitle)
</script>
