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
  </BasePage>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/solid'
</script>
