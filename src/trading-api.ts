import type { Equity } from './models/equity.ts'
import type { TimeInterval } from './types/time-interval.ts'
import type { Performance } from './types/performance.ts'
import type { TradingMode } from './types/trading-mode.ts'
import type { Trade } from './types/trade.ts'
import type { CommissionEquity } from './models/commission-equity.ts'

export class TradingApi {
  private readonly tradingMode: TradingMode
  private readonly api: string

  constructor(tradingMode: TradingMode) {
    this.tradingMode = tradingMode
    this.api = import.meta.env.PUBLIC_API
  }

  async getHealthCheck(): Promise<boolean> {
    const response: Response = await fetch(this.api)
    return response.ok
  }

  async getUptime(): Promise<number> {
    const endpoint: string = 'uptime'
    return this.fetchJsonData<number>(endpoint)
  }

  async getEquityGraph(interval: TimeInterval): Promise<Equity[]> {
    const queryParams: string = `interval=${interval}`
    const endpoint: string = `${this.tradingMode}/graph/equity?${queryParams}`
    console.log(endpoint)
    return this.fetchJsonData<Equity[]>(endpoint)
  }

  async getPerformance(): Promise<Performance> {
    const endpoint: string = `${this.tradingMode}/performance`
    return this.fetchJsonData<Performance>(endpoint)
  }

  async getCommissionEquity(): Promise<CommissionEquity> {
    const endpoint: string = `${this.tradingMode}/commission-equity`
    return this.fetchJsonData<CommissionEquity>(endpoint)
  }

  async getLatestTrades(): Promise<Trade[]> {
    const endpoint: string = `${this.tradingMode}/latest-trades`
    return this.fetchJsonData<Trade[]>(endpoint)
  }

  private async fetchJsonData<T>(endpoint: string): Promise<T> {
    const response: Response = await fetch(this.api + endpoint)
    const json = await response.json()
    return json.data
  }
}
