import type { Signal } from './signal.ts'

export interface Prediction {
  id?: number
  pair: string
  current_price: number
  signal: Signal
  created_at: string
}
