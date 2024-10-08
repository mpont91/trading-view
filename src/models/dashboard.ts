import type { Position } from './position'
import type { Balance } from './balance'
import type { Market } from './market'
import type { Holding } from './holding.ts'

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

export interface DashboardPerformancePair {
  pair: string
  trades: number
  pnl: number
  pnl_percentage: number
}

export interface DashboardPerformanceSummary {
  total_trades: number
  successful_trades: number
  failed_trades: number
  total_pnl: number
  total_pnl_percentage: number
}

export interface DashboardPerformance {
  total_trades: number
  successful_trades: number
  failed_trades: number
  total_pnl: number
  total_pnl_percentage: number
  best_performing_pair: DashboardPerformancePair | null
  worst_performing_pair: DashboardPerformancePair | null
}

export interface DashboardLogs {
  total_errors: number
}

export interface Dashboard {
  status: DashboardStatus
  lifetime: DashboardLifetime
  performance: DashboardPerformance
  holdings: Holding[]
  opened_positions: Position[]
  logs: DashboardLogs
  balances: Balance[]
  markets: Market[]
}
