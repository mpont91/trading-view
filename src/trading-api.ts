import type { Equity } from './models/equity.ts'
import type { TimeInterval } from './types/time-interval.ts'
import type { Performance } from './types/performance.ts'
import type { TradingMode } from './types/trading-mode.ts'
import type { Trade } from './types/trade.ts'
import type { CommissionEquity } from './models/commission-equity.ts'
import type { Indicator } from './types/indicator.ts'
import type { Strategy } from './types/strategy.ts'
import type { IndicatorsRulesSettings } from './types/settings.ts'

export class TradingApi {
  private readonly tradingMode: TradingMode | null
  private readonly api: string

  constructor(tradingMode: TradingMode | null = null) {
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

  async getIndicators(): Promise<Indicator[]> {
    const endpoint: string = `market/indicators`
    return this.fetchJsonData<Indicator[]>(endpoint)
  }

  async getStrategies(): Promise<Strategy[]> {
    const endpoint: string = `market/latest-strategies`
    return this.fetchJsonData<Strategy[]>(endpoint)
  }

  async getLatestOpportunities(): Promise<Strategy[]> {
    const endpoint: string = `market/latest-opportunities`
    return this.fetchJsonData<Strategy[]>(endpoint)
  }

  async getRules(): Promise<IndicatorsRulesSettings> {
    const endpoint: string = `market/rules`
    return this.fetchJsonData<IndicatorsRulesSettings>(endpoint)
  }

  private async fetchJsonData<T>(endpoint: string): Promise<T> {
    const response: Response = await fetch(this.api + endpoint)
    const json = await response.json()
    return json.data
  }
}
