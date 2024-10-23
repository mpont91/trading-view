import type { Signal } from './signal'

export interface Pair {
  name: string
  price: number
  signal: Signal
  updated_at: string
}
