<template>
  <Card>
    <h2>{{ title }}</h2>
    <p class="text-red-400">Something went wrong...</p>
  </Card>
</template>
<script setup lang="ts">
import Card from '../Card.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
