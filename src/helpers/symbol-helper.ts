import type { Option } from './option-helper.ts'

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

export function getSymbolLabel(symbol: string) {
  const config = SYMBOL_OPTIONS[symbol as SymbolKey]

  return config ? config.label : symbol
}
