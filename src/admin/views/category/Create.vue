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
        <form
          action=""
          enctype="multipart/form-data"
          @submit.prevent="submitData"
        >
          <BaseCard class="w-full mt-6">
            <BaseInputGroup label="Category Image" required>
              <div
                class="w-full h-20 border-2 border-gray-300 border-dashed rounded  focus:border-primary-400"
              >
                <img :src="imageUrl" alt="" />
                <input
                  type="file"
                  class="flex p-4 item-center"
                  @change="handleImage"
                />
              </div>
            </BaseInputGroup>

            <BaseInputGroup
              label="Name"
              class="my-4"
              required
              :error="v$.name.$error && v$.name.$errors[0].$message"
            >
              <BaseInput
                v-model="formData.name"
                :invalid="v$.name.$error"
                @input="v$.name.$touch()"
              />
            </BaseInputGroup>

            <BaseInputGroup
              label="Description"
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
// useRouter
import { useRoute } from 'vue-router'
import { useCategoryStore } from '../../../store/category'
// import { useNotificationStore } from '../../../store/notification'
import { SaveIcon } from '@heroicons/vue/outline'
import { required, maxLength, helpers } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

// Local State

let formData = reactive({
  name: '',
  description: '',
})

const imagepath = ref('')
const imageUrl = ref('')
const isLoading = ref(false)

// Store

const categoryStore = useCategoryStore()
// const notificationStore = useNotificationStore()

// Router

const route = useRoute()
// const router = useRouter()

// Computed

const isEdit = computed(() => route.name === 'categories.edit')

const pageTitle = computed(() =>
  isEdit.value ? 'Edit Category' : 'New Category'
)

// Validation

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Field is required', required),
    },

    description: {
      required: helpers.withMessage('Field is required', required),
      maxLength: helpers.withMessage(
        'Description should not be greater than 255 characters.',
        maxLength(65000)
      ),
    },
  }
})

const v$ = useVuelidate(rules, formData)

// Methods

function handleImage(e) {
  imagepath.value = e.target.files[0]
}

if (isEdit.value) {
  loadData()
}

async function loadData() {
  await categoryStore.fetchCategories()

  let res = categoryStore.categories.find((category) => {
    if (category._id == route.params.id) {
      return category
    }
  })

  imageUrl.value = res?.image

  Object.assign(formData, res)
}

async function submitData() {
  v$.value.$touch()

  if (v$.value.$invalid) {
    return true
  }

  // let data = {
  //   name: formData.name,
  //   description: formData.description,
  //   ...imgData,
  // }

  const imgData = new FormData()
  imgData.append('categoryImage', imagepath.value)
  await categoryStore.uploadImage(imgData)

  isLoading.value = true

  // if (isEdit.value) {
  //   await categoryStore
  //     .updateCategory(route.params.id, data)
  //     .then((res) => {
  //       if (res.data.data) {
  //         isLoading.value = false
  //         notificationStore.showNotification({
  //           type: 'success',
  //           message: 'Category updated successfully.',
  //         })
  //         router.push('/admin/categories')
  //       } else {
  //         notificationStore.showNotification({
  //           type: 'error',
  //           message: res.data.message,
  //         })
  //       }
  //     })
  //     .catch((err) => {
  //       if (err) {
  //         isLoading.value = false

  //         notificationStore.showNotification({
  //           type: 'error',
  //           message: err.response.data.message,
  //         })
  //       }
  //     })
  // } else {
  //   await categoryStore
  //     .addCategory(data)
  //     .then((res) => {
  //       if (res.data.data) {
  //         isLoading.value = false
  //         notificationStore.showNotification({
  //           type: 'success',
  //           message: 'Category created successfully.',
  //         })
  //         router.push('/admin/categories')
  //       } else {
  //         notificationStore.showNotification({
  //           type: 'error',
  //           message: res.data.message,
  //         })
  //       }
  //     })
  //     .catch((err) => {
  //       if (err) {
  //         isLoading.value = false

  //         notificationStore.showNotification({
  //           type: 'error',
  //           message: err.response.data.message,
  //         })
  //       }
  //     })
  // }
}

console.log(pageTitle)
</script>
