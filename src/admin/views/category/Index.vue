<template>
  <BasePage>
    <!-- Page Header Section -->
    <BasePageHeader title="Categories">
      <BaseBreadcrumb>
        <BaseBreadcrumbItem title="Home" to="dashboard" />
        <BaseBreadcrumbItem title="Categories" to="#" active />
      </BaseBreadcrumb>

      <template #actions>
        <div class="flex items-center justify-end space-x-5">
          <BaseButton @click="$router.push('/admin/categories/create')">
            <template #left="slotProps">
              <PlusIcon :class="slotProps.class" />
            </template>
            Create Category
          </BaseButton>
        </div>
      </template>
    </BasePageHeader>

    <div v-if="categoryStore.categories.length" class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div
            class="overflow-hidden border-b border-gray-200 shadow  sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                  >
                    Description
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(category, index) in categoryStore.categories"
                  :key="category"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                >
                  <td
                    class="px-6 py-4 text-sm font-medium text-gray-900  whitespace-nowrap"
                  >
                    {{ category.name }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {{ category.description }}
                  </td>
                  <td
                    class="px-6 py-4 text-sm font-medium text-right  whitespace-nowrap"
                  >
                    <router-link
                      :to="`/admin/categories/${category._id}/edit`"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      <span class="flex items-center justify-center">
                        <PencilAltIcon class="h-5 mr-2" />
                        Edit
                      </span>
                    </router-link>
                  </td>
                  <td
                    class="px-6 py-4 text-sm font-medium text-right text-red-400 cursor-pointer  hover:text-red-500 whitespace-nowrap"
                    @click="removeCategory(category._id)"
                  >
                    <span class="flex items-center justify-center">
                      <TrashIcon class="h-5 mr-2" />
                      Delete
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center p-5 mt-20 bg-white rounded "
    >
      <div class="mt-2">
        <label class="font-medium">No Categories yet!</label>
      </div>
      <div class="mt-2">
        <label class="text-gray-500">
          This section will contain the list of categories .
        </label>
      </div>
      <div class="mt-6">
        <BaseButton @click="$router.push('/admin/categories/create')">
          <template #left="slotProps">
            <PlusIcon :class="slotProps.class" />
          </template>
          Create Category
        </BaseButton>
      </div>
    </div>
  </BasePage>
</template>

<script setup>
import { PlusIcon, PencilAltIcon, TrashIcon } from '@heroicons/vue/solid'
import { useCategoryStore } from '../../../store/category'
import { useNotificationStore } from '../../../store/notification'
import { useDialogStore } from '../../../store/dialog'

// Store

const categoryStore = useCategoryStore()
const notificationStore = useNotificationStore()
const dialogStore = useDialogStore()

categoryStore.fetchCategories()

function removeCategory(id) {
  dialogStore
    .openDialog({
      title: 'Are you sure',
      message: 'You will not be able to recover this Category.',
      yesLabel: 'OK',
      noLabel: 'Cancel',
      variant: 'danger',
      hideNoButton: false,
      size: 'lg',
    })
    .then(async (res) => {
      if (res) {
        await categoryStore.deleteCategory(id).then((response) => {
          if (response.data.code === 200) {
            notificationStore.showNotification({
              type: 'success',
              message: 'Category deleted successfully',
            })
            return true
          } else {
            notificationStore.showNotification({
              type: 'error',
              message: res.data.message,
            })
          }
          return true
        })
      } else {
        notificationStore.showNotification({
          type: 'error',
          message: res.data.message,
        })
      }
    })
    .catch((err) => {
      if (err) {
        notificationStore.showNotification({
          type: 'error',
          message: 'Something went wrong',
        })
      }
    })
}
</script>
