export interface Position {
  id?: number
  is_closed: boolean
  is_trailing: boolean
  pair: string
  quantity: number
  amount: number
  buy_price: number
  buy_at: string
  buy_commission: number
  stop_profit: number
  stop_loss: number
  trailing_highest?: number
  trailing_lowest?: number
  sell_price?: number
  sell_at?: string
  sell_commission?: number
  pnl?: number
  pnl_percentage?: number
}
