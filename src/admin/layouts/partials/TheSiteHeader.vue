<template>
  <div class="fixed top-0 left-0 w-full min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                class="w-8 h-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </div>
            <div class="hidden md:block">
              <div class="flex items-baseline ml-10 space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.route"
                  :class="activeClass(item.route)"
                  :aria-current="item.current ? 'page' : undefined"
                  >{{ item.name }}</router-link
                >
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="flex items-center ml-4 md:ml-6">
              <!-- Profile dropdown -->
              <div as="div" class="relative ml-3">
                <div
                  class="flex items-center max-w-xs text-sm font-medium text-gray-300 cursor-pointer  hover:text-white"
                  @click.prevent="logout"
                >
                  <LogoutIcon class="h-5 mr-1" />
                  Logout
                </div>
              </div>
            </div>
          </div>
          <div class="flex -mr-2 md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md  hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block w-6 h-6" aria-hidden="true" />
              <XIcon v-else class="block w-6 h-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="router-link"
            :to="item.route"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="px-2 mt-3 space-y-1">
            <DisclosureButton
              class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md  hover:text-white hover:bg-gray-700"
              @click.prevent="logout"
            >
              <LogoutIcon class="h-5" /> Logout</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MenuIcon, XIcon, LogoutIcon } from '@heroicons/vue/outline'

import { useRoute, useRouter } from 'vue-router'

const navigation = [
  { name: 'Dashboard', route: '/admin/dashboard', current: false },
  { name: 'Categories', route: '/admin/categories', current: false },
  { name: 'Products', route: '/admin/products', current: false },
]

const route = useRoute()
const router = useRouter()

function hasActiveUrl(url) {
  return route && route.path.includes(url)
}

function activeClass(url) {
  return hasActiveUrl(url)
    ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
    : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
}

function logout() {
  window.localStorage.removeItem('token')
  router.push('/admin/login')
}
</script>
