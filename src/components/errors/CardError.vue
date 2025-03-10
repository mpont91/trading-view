<template>
  <Card :title="title">
    <p class="text-red-400">Something went wrong...</p>
  </Card>
</template>
<script setup lang="ts">
import Card from '../common/Card.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
