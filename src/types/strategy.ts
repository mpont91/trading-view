import { Signal } from './signal'

export interface Strategy {
  id: number
  symbol: string
  price: number
  signal: Signal
  sl?: number
  tp?: number
  createdAt: Date
}