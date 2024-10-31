export type OrderComment =
  | 'BUY'
  | 'STRONG BUY'
  | 'SELL'
  | 'STRONG SELL'
  | 'STOP LOSS'
  | 'TRAILING'

export interface Position {
  id: number
  is_closed: boolean
  is_trailing: boolean
  pair: string
  quantity: number
  amount: number
  buy_price: number
  buy_at: string
  buy_comment: OrderComment
  buy_commission_quantity: number
  buy_commission_amount: number
  stop_profit: number
  stop_loss: number
  trailing_highest?: number
  trailing_lowest?: number
  sell_price?: number
  sell_at?: string
  sell_comment?: OrderComment
  sell_commission_quantity?: number
  sell_commission_amount?: number
  total_commission_quantity: number
  total_commission_amount: number
  pnl?: number
  pnl_percentage?: number
}
