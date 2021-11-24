<template>
  <div id="app">
    <NotificationRoot />

    <router-view />

    <BaseDialog />
  </div>
</template>
<script setup>
import NotificationRoot from './components/base/notification/NotificationRoot.vue'
import BaseDialog from './components/base/BaseDialog.vue'
</script>
