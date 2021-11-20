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
        <form action="submit">
          <BaseCard class="w-full mt-6">
            <BaseInputGroup label="Name">
              <BaseInput />
            </BaseInputGroup>
            <BaseInputGroup label="Description" class="mt-4">
              <BaseInput />
            </BaseInputGroup>
            <BaseButton type="submit" class="mt-6 mb-6">
              <template #left="slotProps">
                <SaveIcon :class="slotProps.class" />
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { SaveIcon } from '@heroicons/vue/outline'

const route = useRoute()

const isEdit = computed(() => route.name === 'categories.edit')

const pageTitle = computed(() =>
  isEdit.value ? 'Edit Category' : 'New Category'
)

console.log(pageTitle)
</script>
