<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()

const isMounted = ref(false)

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  isMounted.value = true
  document.addEventListener('keydown', onKeydown)
})
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport v-if="isMounted" to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
      >
        <div
          class="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm transition-opacity"
          @click="emit('close')"
        ></div>

        <div
          class="relative transform overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div
            class="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50"
          >
            <h3
              id="modal-headline"
              class="text-lg font-medium leading-6 text-white"
            >
              {{ title }}
            </h3>
            <button
              class="rounded-md text-zinc-400 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              @click="emit('close')"
            >
              <span class="sr-only">Close</span>
              <X class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div class="px-4 py-4 text-zinc-300">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
