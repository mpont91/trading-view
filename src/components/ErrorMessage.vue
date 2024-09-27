<template>
  <div
    class="p-4 mb-4 text-sm rounded-lg bg-gray-800 text-red-400"
    role="alert"
  >
    {{ message }}
  </div>
</template>
<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: 'Something went wrong...',
  },
})
</script>
