export interface Position {
  id: number
  is_closed: boolean
  pair: string
  quantity: number
  amount: number
  buy_price: number
  buy_at: string
  stop_profit: number
  stop_loss: number
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
      pnl: number
      pnl_percentage: number
    }
    worst_performing_pair: {
      pair: string
      pnl: number
      pnl_percentage: number
    }
  }
  logs: {
    total_errors: number
    last_log: Log
  }
}
