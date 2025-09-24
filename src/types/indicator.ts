interface Indicator {
  id: number
  symbol: string
  price: number
  createdAt: Date
}

export interface IndicatorSMA extends Indicator {
  period: number
  sma: number
}

export interface IndicatorRSI extends Indicator {
  period: number
  rsi: number
}

export interface IndicatorATR extends Indicator {
  period: number
  atr: number
}

export interface IndicatorADX extends Indicator {
  period: number
  adx: number
  pdi: number
  mdi: number
}

export interface IndicatorBB extends Indicator {
  period: number
  upper: number
  middle: number
  lower: number
  pb: number
}

export interface IndicatorSMACross extends Indicator {
  periodLong: number
  periodShort: number
  smaLong: number
  smaShort: number
}

export interface IndicatorList {
  sma: IndicatorSMA | null
  rsi: IndicatorRSI | null
  atr: IndicatorATR | null
  adx: IndicatorADX | null
  bb: IndicatorBB | null
  smaCross: IndicatorSMACross | null
}
