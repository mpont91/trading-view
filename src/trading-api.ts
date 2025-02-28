import type { Equity } from './types/equity.ts'
import type { TimeInterval } from './types/time-interval.ts'
import type { Performance } from './types/performance.ts'
import type { TradingMode } from './types/trading-mode.ts'
import type { Trade } from './types/trade.ts'
import type { CommissionEquity } from './types/commission-equity.ts'
import type { Strategy } from './types/strategy.ts'

export class TradingApi {
  private readonly api: string

  constructor(private readonly tradingMode: TradingMode | null = null) {
    this.api = import.meta.env.PUBLIC_API
  }

  async getHealthCheck(): Promise<boolean> {
    const response: Response = await fetch(this.api)
    return response.ok
  }

  async getUptime(): Promise<number> {
    const endpoint: string = this.createEndpoint('uptime')
    return this.fetchJsonData<number>(endpoint)
  }

  async getEquityGraph(interval: TimeInterval): Promise<Equity[]> {
    const endpoint: string = this.createEndpoint(
      'graph/equity',
      `interval=${interval}`,
    )
    return this.fetchJsonData<Equity[]>(endpoint)
  }

  async getPerformance(): Promise<Performance> {
    const endpoint: string = this.createEndpoint('performance')
    return this.fetchJsonData<Performance>(endpoint)
  }

  async getCommissionEquity(): Promise<CommissionEquity> {
    const endpoint: string = this.createEndpoint('commission-equity')
    return this.fetchJsonData<CommissionEquity>(endpoint)
  }

  async getLatestTrades(): Promise<Trade[]> {
    const endpoint: string = this.createEndpoint('latest-trades')
    return this.fetchJsonData<Trade[]>(endpoint)
  }

  async getStrategies(): Promise<Strategy[]> {
    const endpoint: string = this.createEndpoint('market/latest-strategies')
    return this.fetchJsonData<Strategy[]>(endpoint)
  }

  async getLatestOpportunities(): Promise<Strategy[]> {
    const endpoint: string = this.createEndpoint('market/latest-opportunities')
    return this.fetchJsonData<Strategy[]>(endpoint)
  }

  private createEndpoint(path: string, params: string | null = null): string {
    let endpoint: string = path

    if (this.tradingMode) {
      endpoint = `${this.tradingMode}/${endpoint}`
    }

    if (params) {
      endpoint += `?${params}`
    }

    return endpoint
  }

  private async fetchJsonData<T>(endpoint: string): Promise<T> {
    const response: Response = await fetch(this.api + endpoint)
    const json = await response.json()
    return json.data
  }
}
