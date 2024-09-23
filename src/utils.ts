import type { SearchCriteria } from './types.ts'

export function formatDate(date?: string): string {
  if (!date) return ''

  const d: Date = new Date(date)
  const year: number = d.getFullYear()
  const month: string = String(d.getMonth() + 1).padStart(2, '0')
  const day: string = String(d.getDate()).padStart(2, '0')
  const hours: string = String(d.getHours()).padStart(2, '0')
  const minutes: string = String(d.getMinutes()).padStart(2, '0')
  const seconds: string = String(d.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function formatTime(seconds: number): string {
  const days: number = Math.floor(seconds / (3600 * 24))
  const hours: number = Math.floor((seconds % (3600 * 24)) / 3600)
  const minutes: number = Math.floor((seconds % 3600) / 60)
  const remainingSeconds: number = Math.floor(seconds % 60)

  return `${days} days ${hours} hours ${minutes} minutes ${remainingSeconds} seconds`
}

export function formatAmount(amount?: number): string {
  if (amount === null || amount === undefined) return ''

  return `$ ${amount.toFixed(2)}`
}

export function formatPercentage(percentage?: number): string {
  if (percentage === null || percentage === undefined) return ''

  return `${percentage.toFixed(2)}%`
}

export function formatNumber(number?: number): string {
  if (number === null || number === undefined) return ''

  if (number >= 9999) {
    return `${number.toFixed(0)}`
  }

  if (number >= 999) {
    return `${number.toFixed(1)}`
  }

  if (number >= 99) {
    return `${number.toFixed(2)}`
  }

  if (number >= 9) {
    return `${number.toFixed(3)}`
  }

  if (number >= 1) {
    return `${number.toFixed(4)}`
  }

  return `${number.toFixed(6)}`
}

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

  return params
}
