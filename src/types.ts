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

export type Signal = 'STRONG BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG SELL'

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

export interface Indicator {
  id: number
  name: string
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

export interface SearchCriteria {
  page?: number
  limit?: number
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, string>
}

export interface Pagination {
  page: number
  limit: number
  totalPages: number
  totalItems: number
}

export interface DashboardStatus {
  active: boolean
  uptime: number
}

export interface DashboardLifetime {
  total_invested: number
  current_value: number
  pnl: number
  pnl_percentage: number
  total_invested_commission: number
  total_invested_commission_bnb: number
  current_commission_value: number
  current_commission_value_bnb: number
}

export interface DashboardPerformance {
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
  } | null
  worst_performing_pair: {
    pair: string
    trades: number
    pnl: number
    pnl_percentage: number
  } | null
}

export interface DashboardLogs {
  total_errors: number
}

export interface Dashboard {
  status: DashboardStatus
  lifetime: DashboardLifetime
  performance: DashboardPerformance
  opened_positions: Position[]
  logs: DashboardLogs
  balances: Balance[]
  markets: Market[]
}
