import type { Signal } from '../models/signal.ts'

export function signalColor(signal: Signal): string {
  switch (signal) {
    case 'STRONG BUY':
      return '#14532d'
    case 'BUY':
      return '#22c55e'
    case 'SELL':
      return '#f87171'
    case 'STRONG SELL':
      return '#7f1d1d'
    case 'HOLD':
      return '#eab308'
    default:
      return 'transparent'
  }
}

export const signals: Signal[] = [
  'STRONG BUY',
  'BUY',
  'HOLD',
  'SELL',
  'STRONG SELL',
]
