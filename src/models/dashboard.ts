import type { Position } from './position'
import type { Balance } from './balance'
import type { Pair } from './pair.ts'

export interface DashboardStatus {
  active: boolean
  uptime: number
}

export interface DashboardLifetime {
  total_invested: number
  current_value: number
  pnl: number
  pnl_percentage: number
  total_invested_commission_amount: number
  total_invested_commission_quantity: number
  current_commission_amount: number
  current_commission_quantity: number
}

export interface DashboardPerformance {
  total_trades: number
  successful_trades: number
  failed_trades: number
  total_pnl: number
  total_pnl_percentage: number
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
  pairs: Pair[]
}
