<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'success' | 'error' | 'warning' | 'neutral'

const props = withDefaults(defineProps<{ variant?: Variant }>(), {
  variant: 'neutral',
})

const classes = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    case 'error':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    case 'warning':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    default:
      return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
  }
})
</script>

<template>
  <span
    class="px-2.5 py-0.5 rounded text-xs font-semibold border transition-colors"
    :class="classes"
  >
    <slot />
  </span>
</template>
