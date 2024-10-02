import type { Prediction } from './prediction.ts'
import type { Indicator } from './indicator.ts'

export interface Analysis {
  predictions: Prediction[]
  indicators: Indicator[]
}
