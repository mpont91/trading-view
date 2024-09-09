export interface Position {
  id: number
  pair: string
  quantity: number
  amount: number
  buy_price: number
  buy_at: string
  sell_price?: number
  sell_at?: string
  pnl?: number
  pnl_percentage?: number
}

export interface Log {
  timestamp: string
  level: string
  message: string
}
