import type { Side } from './side'

export interface IndicatorsRulesSettings {
  side: IndicatorSideRuleSettings[]
  leverage: IndicatorLeverageRuleSettings[]
  tp: IndicatorAtrMultiplier[]
  sl: IndicatorAtrMultiplier[]
}

export interface IndicatorAtrMultiplier {
  period: number
  multiplier: number
}

export interface IndicatorSideRuleSettings {
  value: Side
  conditions: IndicatorConditionRuleSettings[]
}
export interface IndicatorLeverageRuleSettings {
  value: number
  conditions: IndicatorConditionRuleSettings[]
}

export interface IndicatorConditionRuleSettings {
  indicator: Indicator
  period: number
  threshold?: number
  compareWith?: ConditionCompareWith
  condition: ConditionOperator
}

export interface ConditionCompareWith {
  indicator: Indicator
  period: number
}

export type Indicator = 'adx' | 'atr' | 'rsi' | 'sma'
export type ConditionOperator = '>' | '<'
