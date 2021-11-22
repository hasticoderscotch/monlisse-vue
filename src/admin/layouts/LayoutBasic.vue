<template>
  <div class="h-full">
    <NotificationRoot />

    <SiteHeader />

    <div class="flex h-screen pt-20 pb-10 overflow-hidden bg-gray-50">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import SiteHeader from './partials/TheSiteHeader.vue'
import NotificationRoot from '../../components/base/notification/NotificationRoot.vue'
</script>
