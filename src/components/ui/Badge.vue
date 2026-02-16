<script setup lang="ts">
import { BADGE_STYLES, type Variant } from '../../helpers/variant-helper.ts'

const props = withDefaults(defineProps<{ variant?: Variant }>(), {
  variant: 'neutral',
})

const classes = BADGE_STYLES[props.variant] || BADGE_STYLES.neutral
</script>

<template>
  <span
    class="px-2.5 py-0.5 rounded text-xs font-semibold border transition-colors"
    :class="classes"
  >
    <slot />
  </span>
</template>
