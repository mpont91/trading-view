import type { TimeInterval } from '../types/time-interval.ts'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'

export function registerChartJs(): void {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  )
}

export function formatLabel(dateString: Date, interval: TimeInterval): string {
  const date: Date = new Date(dateString)
  switch (interval) {
    case 'day':
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    default:
      return date.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
      })
  }
}
