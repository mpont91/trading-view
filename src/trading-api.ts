import type { Equity } from './types/equity.ts'
import type { TimeInterval } from './types/time-interval.ts'
import type { Performance } from './types/performance.ts'
import type { Trade } from './types/trade.ts'
import type { CommissionEquity } from './types/commission-equity.ts'
import type { Strategy } from './types/strategy.ts'
import type { StrategyAnalysis } from './types/strategy-analysis.ts'

export class TradingApi {
  private readonly api: string

  constructor() {
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

  async getCommissionEquity(): Promise<CommissionEquity | null> {
    const endpoint: string = this.createEndpoint('commission-equity')
    return this.fetchJsonData<CommissionEquity>(endpoint)
  }

  async getLastTrades(symbol: string = ''): Promise<Trade[]> {
    const path: string = this.createPath('last-trades', symbol)
    const endpoint: string = this.createEndpoint(path)
    return this.fetchJsonData<Trade[]>(endpoint)
  }

  async getStrategies(symbol: string = ''): Promise<Strategy[]> {
    const path: string = this.createPath('market/last-strategies', symbol)
    const endpoint: string = this.createEndpoint(path)
    return this.fetchJsonData<Strategy[]>(endpoint)
  }

  async getLastOpportunities(symbol: string = ''): Promise<Strategy[]> {
    const path: string = this.createPath('market/last-opportunities', symbol)
    const endpoint: string = this.createEndpoint(path)
    return this.fetchJsonData<Strategy[]>(endpoint)
  }

  async getStrategyAnalysisGraph(
    symbol: string,
    interval: TimeInterval,
  ): Promise<StrategyAnalysis> {
    const path: string = this.createPath('market/graph/strategy-analysis', symbol)
    const endpoint: string = this.createEndpoint(path, `interval=${interval}`)
    return this.fetchJsonData<StrategyAnalysis>(endpoint)
  }

  private createPath(base: string, param: string): string {
    let path: string = base

    if (param) {
      path += '/' + param
    }

    return path
  }

  private createEndpoint(path: string, params: string | null = null): string {
    let endpoint: string = path

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
