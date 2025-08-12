import type { Side } from './side.ts'

export interface Trade {
  id: number
  symbol: string
  side: Side
  quantity: number
  entryOrderId: string
  entryPrice: number
  entryAt: Date
  exitOrderId: string
  exitPrice: number
  exitAt: Date
  fees: number
  pnl: number
}
