import { z } from 'zod'

const SYMBOL_MAP = {
  btcusdc: 'Bitcoin',
  ethusdc: 'Ethereum',
} as const

export type SymbolKey = keyof typeof SYMBOL_MAP

export const symbolSchema = z
  .enum(Object.keys(SYMBOL_MAP) as [SymbolKey, ...SymbolKey[]])
  .transform((key) => ({
    key: key,
    label: SYMBOL_MAP[key],
  }))
