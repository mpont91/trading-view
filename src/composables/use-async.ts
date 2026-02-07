import { ref, type Ref } from 'vue'

export function useAsync<T>(fn: () => Promise<T>, immediate = true) {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const execute = async () => {
    loading.value = true
    error.value = null

    try {
      data.value = await fn()
    } catch (err) {
      if (err instanceof Error) {
        error.value = err
      } else {
        error.value = new Error('Unknown error')
      }
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  if (immediate) {
    execute()
  }

  return {
    data,
    loading,
    error,
    execute,
  }
}
