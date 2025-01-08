import type { Side } from './side.ts'

export interface Trade {
  symbol: string
  side: Side
  entryPrice: number
  entryDate: string
  exitPrice: number
  exitDate: string
  profit: number
}
