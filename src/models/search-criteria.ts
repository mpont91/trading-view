export interface SearchCriteria {
  page?: number
  limit?: number
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, string>
}
