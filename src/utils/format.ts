export function formatAmount(amount?: number): string {
  if (amount === null || amount === undefined) return ''

  return `$ ${amount.toFixed(2)}`
}

export function formatPercentage(number?: number): string {
  if (number === null || number === undefined) return ''

  return `${(number * 100).toFixed(2)}%`
}

export function formatNumber(number?: number): string {
  if (number === null || number === undefined) return ''

  const absNumber: number = Math.abs(number)

  if (absNumber > 999) {
    return Math.round(number).toString()
  }

  if (absNumber >= 20) {
    return number.toFixed(2)
  }

  if (absNumber > 0.1) {
    return number.toFixed(4)
  }

  return number.toFixed(6)
}

export function formatTime(seconds: number): string {
  const days: number = Math.floor(seconds / (24 * 60 * 60))
  const hours: number = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
  const minutes: number = Math.floor((seconds % (60 * 60)) / 60)
  const remainingSeconds: number = Math.floor(seconds % 60)

  const daysStr: string = days > 0 ? `${days} days,` : ''
  const hoursStr: string = hours > 0 ? `${hours} hours,` : ''
  const minutesStr: string = minutes > 0 ? `${minutes} minutes,` : ''

  return `${daysStr} ${hoursStr} ${minutesStr} ${remainingSeconds} seconds`
}

export function formatDate(dateString: string | Date): string {
  const date: Date = new Date(dateString)

  const year: number = date.getFullYear()
  const month: string = String(date.getMonth() + 1).padStart(2, '0')
  const day: string = String(date.getDate()).padStart(2, '0')
  const hours: string = String(date.getHours()).padStart(2, '0')
  const minutes: string = String(date.getMinutes()).padStart(2, '0')
  const seconds: string = String(date.getSeconds()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}
