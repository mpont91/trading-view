export interface Position {
  id: number
  is_closed: boolean
  is_trailing: boolean
  pair: string
  quantity: number
  amount: number
  buy_price: number
  buy_at: string
  stop_profit: number
  stop_loss: number
  trailing_highest?: number
  trailing_lowest?: number
  sell_price?: number
  sell_at?: string
  pnl?: number
  pnl_percentage?: number
}

export interface Balance {
  currency: string
  quantity: number
  updated_at: string
}

export type Buy = 'BUY'
export type Sell = 'SELL'
export type Hold = 'HOLD'
export type Signal = Buy | Sell | Hold | null

export interface Market {
  pair: string
  price: number
  signal: Signal
  updated_at: string
}

export interface Prediction {
  id: number
  pair: string
  current_price: number
  signal: Signal
  created_at: string
}

export interface Log {
  timestamp: string
  level: string
  message: string
}

export interface Dashboard {
  active: boolean
  last_activity: string
  uptime: number
  opened_positions: Position[]
  performance: {
    total_trades: number
    successful_trades: number
    failed_trades: number
    total_pnl: number
    total_pnl_percentage: number
    best_performing_pair: {
      pair: string
      trades: number
      pnl: number
      pnl_percentage: number
    }
    worst_performing_pair: {
      pair: string
      trades: number
      pnl: number
      pnl_percentage: number
    }
  }
  logs: {
    total_errors: number
    last_log: Log
  }
}
