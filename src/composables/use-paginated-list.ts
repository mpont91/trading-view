import { watch, type Ref } from 'vue'
import { useAsync } from './use-async'
import type { Paginated } from '../schemas/paginated'
import type { PaginationQuery } from '../filters/pagination-filter'

export function usePaginatedList<T, F extends PaginationQuery>(
  fetcher: (filters: F) => Promise<Paginated<T>>,
  filters: Ref<F>,
) {
  const { data, loading, error, execute } = useAsync(() =>
    fetcher(filters.value),
  )

  watch(
    filters,
    (newFilters, oldFilters) => {
      const keys = Object.keys(newFilters) as Array<keyof F>
      const hasFilterChanged = keys.some((key) => {
        if (key === 'page') return false
        return newFilters[key] !== oldFilters[key]
      })

      if (hasFilterChanged) {
        filters.value.page = 1
      }

      execute()
    },
    { deep: true },
  )

  const changePage = (newPage: number) => {
    if (!data.value) return
    if (newPage >= 1 && newPage <= data.value.lastPage) {
      filters.value.page = newPage
    }
  }

  return {
    data,
    loading,
    error,
    retry: execute,
    changePage,
  }
}
