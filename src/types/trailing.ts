export interface Trailing {
  symbol: string
  tp: number
  sl: number
  ts: number
  tpPrice: number
  slPrice: number
  tsPrice?: number
  createdAt: Date
  updatedAt: Date
}
