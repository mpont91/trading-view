<template>
  <div class="bg-neutral-800 shadow p-6 mb-6">
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
