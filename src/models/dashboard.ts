import type { Position } from './position'
import type { Balance } from './balance'
import type { Pair } from './pair.ts'

export interface DashboardStatus {
  active: boolean
  uptime: number
}

export interface DashboardCommissions {
  amount_available: number
  quantity_available: number
}

export interface DashboardPerformance {
  total_trades: number
  successful_trades: number
  failed_trades: number
  total_pnl: number
  total_pnl_percentage: number
  total_commission_amount_paid: number
  total_commission_quantity_paid: number
}

export interface DashboardLogs {
  total_errors: number
}

export interface Dashboard {
  status: DashboardStatus
  performance: DashboardPerformance
  commissions: DashboardCommissions
  opened_positions: Position[]
  logs: DashboardLogs
  balances: Balance[]
  pairs: Pair[]
}
