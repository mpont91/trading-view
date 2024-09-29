import type { Signal } from './signal'

export interface Market {
  pair: string
  price: number
  signal: Signal
  updated_at: string
}
