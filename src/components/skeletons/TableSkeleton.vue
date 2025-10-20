<template>
  <Card :title="title" class="animate-pulse">
    <div class="grid grid-cols-1 gap-2">
      <div class="bg-neutral-900 h-16"></div>
      <div class="bg-neutral-900 h-10"></div>
      <div class="bg-neutral-900 h-10"></div>
      <div class="bg-neutral-900 h-10"></div>
      <div class="bg-neutral-900 h-10"></div>
      <div class="bg-neutral-900 h-10"></div>
    </div>
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
