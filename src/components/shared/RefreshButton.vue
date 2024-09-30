<template>
  <button
    type="button"
    class="text-white font-medium text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none"
    @click="emit('click')"
  >
    Refresh
  </button>
</template>
<script setup lang="ts">
const emit = defineEmits(['click'])
</script>
