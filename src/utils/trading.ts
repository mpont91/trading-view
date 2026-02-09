import type { Variant } from './variant.ts'

export type Option = { value: string; label: string }

export const SYMBOL_OPTIONS = {
  BTCUSDC: {
    label: 'Bitcoin',
    decimals: 2,
  },
  ETHUSDC: {
    label: 'Ethereum',
    decimals: 2,
  },
  SOLUSDC: {
    label: 'Solana',
    decimals: 3,
  },
  PAXGUSDC: {
    label: 'PAX Gold',
    decimals: 2,
  },
  TRXUSDC: {
    label: 'Tron',
    decimals: 4,
  },
} as const

export type SymbolKey = keyof typeof SYMBOL_OPTIONS

export function getSymbolOptions() {
  const options: Option[] = Object.entries(SYMBOL_OPTIONS).map(
    ([key, item]) => ({
      value: key,
      label: item.label,
    }),
  )

  options.unshift({ value: '', label: 'All symbols' })

  return options
}

export const getSymbolLabel = (symbol: string) => {
  const config = SYMBOL_OPTIONS[symbol as SymbolKey]

  return config ? config.label : symbol
}

export const ACTION_OPTIONS = {
  BUY: {
    label: 'Buy',
  },
  SELL: {
    label: 'Sell',
  },
  HOLD: {
    label: 'Hold',
  },
} as const

export function getActionOptions() {
  const options: Option[] = Object.entries(ACTION_OPTIONS).map(
    ([key, item]) => ({
      value: key,
      label: item.label,
    }),
  )

  options.unshift({ value: '', label: 'All actions' })

  return options
}

export function getActionVariant(action: string): Variant {
  switch (action) {
    case 'BUY':
      return 'success'
    case 'SELL':
      return 'error'
    case 'HOLD':
      return 'warning'
    default:
      return 'neutral'
  }
}
