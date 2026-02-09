export const formatTime = (date: Date | string | number) => {
  const d = new Date(date)
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d)
}

export const formatDate = (date: Date | string | number) => {
  const d = new Date(date)
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d)
}

export const formatDateTime = (date: Date | string | number) => {
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

export const formatDuration = (seconds: number): string => {
  const days: number = Math.floor(seconds / (24 * 60 * 60))
  const hours: number = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
  const minutes: number = Math.floor((seconds % (60 * 60)) / 60)
  const remainingSeconds: number = Math.floor(seconds % 60)

  const daysStr: string = days > 0 ? `${days} days,` : ''
  const hoursStr: string = hours > 0 ? `${hours} hours,` : ''
  const minutesStr: string = minutes > 0 ? `${minutes} minutes,` : ''

  return `${daysStr} ${hoursStr} ${minutesStr} ${remainingSeconds} seconds`
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value)
}
