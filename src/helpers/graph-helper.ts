import type { TimeInterval } from '../types/time-interval.ts'
import type { ChartOptions } from 'chart.js'

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

export function getChartOptions(
  dates: Date[],
  interval: TimeInterval,
): ChartOptions<'line'> {
  return {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: layoutColor,
        },
        ticks: {
          callback: (_: string | number, index: number) =>
            formatLabel(dates[index], interval),
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        grid: {
          color: layoutColor,
        },
      },
    },
  }
}

export const layoutColor: string = '#525252'
export const greenPointColor: string = '#22c55e'
export const greenLineColor: string = '#166534'
export const redLineColor: string = '#991b1b'
export const redPointColor: string = '#dc2626'
export const whiteLineColor: string = '#e5e5e5'
export const whitePointColor: string = '#f5f5f5'
export const blueLineColor: string = '#1e40af'
export const bluePointColor: string = '#3b82f6'
export const yellowLineColor: string = '#854d0e'
export const yellowPointColor: string = '#f59e0b'
export const orangeLineColor: string = '#9a3412'
export const orangePointColor: string = '#f97316'
export const purpleLineColor: string = '#581c87'
export const purplePointColor: string = '#a855f7'
export const cyanLineColor: string = '#155e75'
export const cyanPointColor: string = '#06b6d4'
