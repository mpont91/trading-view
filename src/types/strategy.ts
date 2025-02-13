import type { Side } from './side.ts'

export interface Strategy {
  id: number
  symbol: string
  price: number
  side: Side
  sl?: number
  tp?: number
  leverage?: number
  createdAt: Date
}
