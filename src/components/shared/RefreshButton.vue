<template>
  <button
    type="button"
    class="text-white inline-flex items-center font-medium text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none"
    :disabled="disabled"
    @click="emit('click')"
  >
    <Refresh class="me-2" />
    Refresh
  </button>
</template>
<script setup lang="ts">
import Refresh from '../../icons/Refresh.vue'

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])
</script>
