import type { Holding } from './models/holding.ts'
import type { TimeInterval } from './types/time-interval.ts'
import type { Performance } from './types/performance.ts'
import type { TradingMode } from './types/trading-mode.ts'
import type { CommissionAvailable } from './types/commission-available.ts'

export class TradingApi {
  private readonly tradingMode: TradingMode
  private readonly api: string

  constructor(tradingMode: TradingMode) {
    this.tradingMode = tradingMode
    if (this.tradingMode === 'spot') {
      this.api = import.meta.env.PUBLIC_SPOT_API
    } else if (this.tradingMode === 'futures') {
      this.api = import.meta.env.PUBLIC_FUTURES_API
    } else {
      throw Error('Invalid trading mode')
    }
  }

  async getHealthCheck(): Promise<boolean> {
    const response: Response = await fetch(this.api)
    return response.ok
  }

  async getHoldingGraph(interval: TimeInterval): Promise<Holding[]> {
    const queryParams: string = `interval=${interval}`
    const endpoint: string = `graph/holding?${queryParams}`
    return this.fetchJsonData<Holding[]>(endpoint)
  }

  async getPerformance(): Promise<Performance> {
    const endpoint: string = 'performance'
    return this.fetchJsonData<Performance>(endpoint)
  }

  async getCommissionAvailable(): Promise<CommissionAvailable> {
    const endpoint: string = 'commission-available'
    return this.fetchJsonData<CommissionAvailable>(endpoint)
  }

  private async fetchJsonData<T>(endpoint: string): Promise<T> {
    const response: Response = await fetch(this.api + endpoint)
    const json = await response.json()
    return json.data
  }
}
