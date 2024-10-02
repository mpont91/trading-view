export type Signal = 'STRONG BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG SELL'

export interface SignalWeights {
  'STRONG BUY': number
  BUY: number
  HOLD: number
  SELL: number
  'STRONG SELL': number
}
