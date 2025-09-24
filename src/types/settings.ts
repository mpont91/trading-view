import type { KlineInterval } from './kline'

export interface ApiSettings {
  klineHistoryInterval: KlineInterval
  klineHistoryLimit: number
}

export interface TradingSettings {
  maxPositionsOpened: number
  symbols: string[]
  safetyCapitalMargin: number
}

export interface IndicatorsSettings {
  adx: number
  atr: number
  rsi: number
  sma: number
  bb: {
    period: number
    multiplier: number
  }
  smaCross: {
    periodLong: number
    periodShort: number
  }
}

export interface StopsSettings {
  tp: number | null
  sl: number | null
}
