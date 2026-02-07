<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div
    class="bg-zinc-900 border border-zinc-800 rounded-lg shadow-sm overflow-hidden"
  >
    <div
      v-if="title || $slots.header"
      class="px-4 py-3 border-b border-zinc-800 bg-zinc-900/50"
    >
      <slot name="header">
        <h3 class="font-semibold text-zinc-100">{{ title }}</h3>
      </slot>
    </div>

    <div class="p-4">
      <slot />
    </div>
  </div>
</template>
