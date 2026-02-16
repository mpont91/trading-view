export function formatTime(date: Date) {
  const d = new Date(date)
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d)
}

export function formatDate(date: Date) {
  const d = new Date(date)
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d)
}

export function formatDateTime(date: Date) {
  const d = new Date(date)
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d)
}

export function formatDuration(seconds: number): string {
  const days: number = Math.floor(seconds / (24 * 60 * 60))
  const hours: number = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
  const minutes: number = Math.floor((seconds % (60 * 60)) / 60)
  const remainingSeconds: number = Math.floor(seconds % 60)

  const daysStr: string = days > 0 ? `${days} days,` : ''
  const hoursStr: string = hours > 0 ? `${hours} hours,` : ''
  const minutesStr: string = minutes > 0 ? `${minutes} minutes,` : ''

  return `${daysStr} ${hoursStr} ${minutesStr} ${remainingSeconds} seconds`
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value)
}

export function formatQuantity(value: number, decimals: number = 4) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatPercentage(value: number, decimals: number = 2) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    signDisplay: 'exceptZero',
  }).format(value / 100)
}

export function formatDurationRange(start: Date, end?: Date | null) {
  if (!end) return 'Active'
  const diff = new Date(end).getTime() - new Date(start).getTime()

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 24) return `${Math.floor(hours / 24)}d ${hours % 24}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}
