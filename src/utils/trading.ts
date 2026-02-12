import type { Variant } from './variant.ts'

export type Option = { value: string; label: string }

export const SYMBOL_OPTIONS = {
  AVAXUSDC: {
    label: 'Avalanche',
  },
  POLUSDC: {
    label: 'Polygon',
  },
  UNIUSDC: {
    label: 'Uniswap',
  },
  PAXGUSDC: {
    label: 'PAX Gold',
  },
  AAVEUSDC: {
    label: 'Aave',
  },
  DOGEUSDC: {
    label: 'Dogecoin',
  },
  BCHUSDC: {
    label: 'Bitcoin Cash',
  },
  ETCUSDC: {
    label: 'Ethereum Classic',
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

export const SIDE_OPTIONS = {
  BUY: {
    label: 'Buy',
  },
  SELL: {
    label: 'Sell',
  },
} as const

export function getSideOptions() {
  const options: Option[] = Object.entries(SIDE_OPTIONS).map(([key, item]) => ({
    value: key,
    label: item.label,
  }))

  options.unshift({ value: '', label: 'All sides' })

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

export function getSideVariant(side: string): Variant {
  switch (side) {
    case 'BUY':
      return 'success'
    case 'SELL':
      return 'error'
    default:
      return 'neutral'
  }
}
