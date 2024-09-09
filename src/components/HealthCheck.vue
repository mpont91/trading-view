<template>
  <div
    v-if="status === false"
    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
    role="alert"
  >
    Trading bot is not working right now!
  </div>
  <div
    v-else-if="status === true"
    class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
    role="alert"
  >
    Trading bot is working fine right now!
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getHealthCheck } from '../api'

const status = ref<null | boolean>(null)

onMounted(async () => {
  try {
    status.value = await getHealthCheck()
  } catch (error: unknown) {
    status.value = false
  }
})
</script>

<style scoped></style>
