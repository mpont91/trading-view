import { fiatCurrency } from './pairs-helper.ts'

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

export function formatRangeDates(dates: Date[]): string {
  const from: Date = dates[0]
  const dayFrom: number = from.getDate()
  const monthFrom: number = from.getMonth() + 1
  const yearFrom: number = from.getFullYear()
  const fromString: string = `${yearFrom}-${monthFrom}-${dayFrom}`

  if (dates.length === 1) {
    return fromString
  }

  const to: Date = dates[1]
  const dayTo: number = to.getDate()
  const monthTo: number = to.getMonth() + 1
  const yearTo: number = to.getFullYear()
  const toString: string = `${yearTo}-${monthTo}-${dayTo}`

  return `${fromString} - ${toString}`
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

  return `${fiatCurrency} ${amount.toFixed(2)}`
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

export const dateTimeFormatLocale: string = 'es-ES'
export const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
}
