import type { Signal } from './signal'

export interface Indicator {
  id: number
  name: string
  pair: string
  current_price: number
  signal: Signal
  created_at: string
}
