<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component | object
}>()
</script>

<template>
  <component :is="icon" />
</template>
