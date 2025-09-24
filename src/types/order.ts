import { Side } from './side'

export interface Order {
  id: number
  orderId: string
  symbol: string
  side: Side
  quantity: number
  price: number
  amount: number
  fees: number
  createdAt: Date
}
