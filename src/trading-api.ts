import type { Equity } from './types/equity.ts'
import type { TimeInterval } from './types/time-interval.ts'
import type { Performance } from './types/performance.ts'
import type { Trade } from './types/trade.ts'
import type { CommissionEquity } from './types/commission-equity.ts'
import type { StrategyAnalysis } from './types/strategy-analysis.ts'
import type { Position } from './types/position.ts'
import type { Trailing } from './types/trailing.ts'

type QueryParams = Record<string, string | number | boolean>

export class TradingApi {
  private readonly api: string

  constructor() {
    this.api = import.meta.env.PUBLIC_API

    if (this.api.endsWith('/')) {
      this.api = this.api.slice(0, -1)
    }
  }

  async getHealthCheck(): Promise<boolean> {
    const response: Response = await fetch(this.api)
    return response.ok
  }

  async getUptime(): Promise<number> {
    return this.request<number>('uptime')
  }

  async getEquityGraph(interval: TimeInterval): Promise<Equity[]> {
    return this.request<Equity[]>('equity/graph', { interval })
  }

  async getPerformance(symbol: string = ''): Promise<Performance> {
    return this.request<Performance>(['performance', symbol])
  }

  async getCommissionEquity(): Promise<CommissionEquity | null> {
    return this.request<CommissionEquity>('commission-equity')
  }

  async getLastTrades(symbol: string = ''): Promise<Trade[]> {
    return this.request<Trade[]>(['last-trades', symbol])
  }

  async getPositions(): Promise<Position[]> {
    return this.request<Position[]>('positions')
  }

  async getTrailing(): Promise<Trailing[]> {
    return this.request<Trailing[]>('trailing')
  }

  async getStrategyAnalysisGraph(
    symbol: string,
    interval: TimeInterval,
  ): Promise<StrategyAnalysis> {
    const path = ['strategy-analysis', symbol]
    const params = { interval }
    return this.request<StrategyAnalysis>(path, params)
  }

  private buildUrl(path: string | string[], params?: QueryParams): string {
    const segments = [path]
      .flat()
      .filter((p) => p)
      .join('/')

    const url = new URL(`${this.api}/${segments}`)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    return url.toString()
  }

  private async request<T>(
    path: string | string[],
    params?: QueryParams,
  ): Promise<T> {
    const endpoint = this.buildUrl(path, params)

    try {
      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error(
          `Error request: ${response.status} ${response.statusText}`,
        )
      }

      const json = await response.json()
      return json.data as T
    } catch (error) {
      console.error(`Error fetch ${endpoint}:`, error)
      throw error
    }
  }
}
