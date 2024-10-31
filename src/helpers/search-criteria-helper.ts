import type { SearchCriteria } from '../models/search-criteria.ts'

export function buildQueryParams(
  searchCriteria: SearchCriteria,
): URLSearchParams {
  const params = new URLSearchParams()

  if (searchCriteria.page !== undefined) {
    params.append('page', searchCriteria.page.toString())
  }

  if (searchCriteria.limit !== undefined) {
    params.append('limit', searchCriteria.limit.toString())
  }

  if (searchCriteria.sortField) {
    params.append('sortField', searchCriteria.sortField)
  }

  if (searchCriteria.sortOrder) {
    params.append('sortOrder', searchCriteria.sortOrder)
  }

  if (searchCriteria.filters) {
    for (const [key, value] of Object.entries(searchCriteria.filters)) {
      if (value !== null && value !== '') {
        params.append(`filters[${key}]`, value.toString())
      }
    }
  }

  return params
}
