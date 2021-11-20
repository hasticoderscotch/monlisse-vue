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
        <form action="submit">
          <BaseCard class="w-full mt-6"> </BaseCard>
        </form>
      </div>
    </div>
  </BasePage>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isEdit = computed(() => route.name === 'products.edit')

const pageTitle = computed(() =>
  isEdit.value ? 'Edit Product' : 'New Product'
)

console.log(pageTitle)
</script>
