<template>
  <BasePage>
    <!-- Page Header Section -->
    <BasePageHeader title="Products">
      <BaseBreadcrumb>
        <BaseBreadcrumbItem title="Home" to="dashboard" />
        <BaseBreadcrumbItem title="Products" to="#" active />
      </BaseBreadcrumb>

      <template #actions>
        <div class="flex items-center justify-end space-x-5">
          <BaseButton @click="$router.push('/admin/products/create')">
            <template #left="slotProps">
              <PlusIcon :class="slotProps.class" />
            </template>
            Create Product
          </BaseButton>
        </div>
      </template>
    </BasePageHeader>

    <div class="flex flex-col">
      <div
        v-if="productStore.products.length"
        class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"
      >
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
                    Title
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                  >
                    Active
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
                  v-for="(product, index) in productStore.products"
                  :key="product"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                >
                  <td
                    class="px-6 py-4 text-sm font-medium text-gray-900  whitespace-nowrap"
                  >
                    {{ product.name }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {{ product.title }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {{ product.quantity }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {{ product.price }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <span
                      :class="[
                        {
                          'bg-green-100 text-green-800': product.isActive,
                          'bg-red-100 text-red-800': !product.isActive,
                        },
                        'inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium uppercase',
                      ]"
                    >
                      {{ product.isActive ? 'yes' : 'no' }}
                    </span>
                  </td>
                  <td
                    class="px-6 py-4 text-sm font-medium text-right  whitespace-nowrap"
                  >
                    <router-link
                      :to="`/admin/products/${product._id}/edit`"
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
                    @click="removeProduct(product._id)"
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
      <div
        v-else
        class="flex flex-col items-center justify-center p-5 mt-20 bg-white rounded "
      >
        <div class="mt-2">
          <label class="font-medium">No Products yet!</label>
        </div>
        <div class="mt-2">
          <label class="text-gray-500">
            This section will contain the list of products.
          </label>
        </div>
        <div class="mt-6">
          <BaseButton @click="$router.push('/admin/products/create')">
            <template #left="slotProps">
              <PlusIcon :class="slotProps.class" />
            </template>
            Create Product
          </BaseButton>
        </div>
      </div>
    </div>
  </BasePage>
</template>

<script setup>
import { PlusIcon, PencilAltIcon, TrashIcon } from '@heroicons/vue/solid'
import { useProductStore } from '../../../store/product'
import { useNotificationStore } from '../../../store/notification'
import { useDialogStore } from '../../../store/dialog'

// Store

const productStore = useProductStore()
const notificationStore = useNotificationStore()
const dialogStore = useDialogStore()

productStore.fetchProducts()

function removeProduct(id) {
  dialogStore
    .openDialog({
      title: 'Are you sure',
      message: 'You will not be able to recover this Product.',
      yesLabel: 'OK',
      noLabel: 'Cancel',
      variant: 'danger',
      hideNoButton: false,
      size: 'lg',
    })
    .then(async (res) => {
      if (res) {
        await productStore.deleteProduct(id).then((response) => {
          if (response.data.code === 200) {
            notificationStore.showNotification({
              type: 'success',
              message: 'Product deleted successfully',
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
