<template>
  <nav
    class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
    aria-label="Table navigation"
  >
    <span
      class="text-sm font-normal text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto"
    >
      Showing
      <span class="font-semibold text-white">
        {{ (currentPage - 1) * itemsPerPage + 1 }} -
        {{ Math.min(currentPage * itemsPerPage, length) }}
      </span>
      of
      <span class="font-semibold text-white">
        {{ length }}
      </span>
    </span>
    <ul class="inline-flex -space-x-px h-8">
      <li>
        <button
          @click="emit('prevPage')"
          :disabled="currentPage === 1"
          class="flex items-center justify-center px-3 h-8 ms-0 leading-tight border -md bg-neutral-800 border-neutral-700 text-gray-400 hover:bg-neutral-700 hover:text-white"
        >
          Previous
        </button>
      </li>
      <li>
        <button
          @click="emit('nextPage')"
          :disabled="currentPage === pages"
          class="flex items-center justify-center px-3 h-8 leading-tight border bg-neutral-800 border-neutral-700 text-gray-400 hover:bg-neutral-700 hover:text-white"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
defineProps({
  length: {
    type: Number,
    default: 0,
  },
  pages: {
    type: Number,
    default: 0,
  },
  itemsPerPage: {
    type: Number,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
})
const emit = defineEmits(['nextPage', 'prevPage'])
</script>
