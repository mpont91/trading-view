import type { Pair } from '../models/pair.ts'
import type { Position } from '../models/position.ts'

export const fiatCurrency: string = '$'
export const baseCurrency: string = 'USDC'
export const commissionsCurrency: string = 'BNB'
export function calculateAmountInBaseCurrency(
  currency: string,
  quantity: number,
  pairs: Pair[],
): number {
  if (currency === baseCurrency) return quantity

  const pair: Pair | undefined = pairs.find(
    (pair: Pair): boolean => pair.name === `${currency}${baseCurrency}`,
  )

  if (!pair) {
    return 0
  }

  return quantity * pair.price
}

export function getPair(pair: string, pairs: Pair[]): Pair {
  return pairs.filter((p: Pair): boolean => p.name === pair)[0]
}

export function pnlLive(position: Position, pairs: Pair[]): number {
  const pair: Pair | undefined = getPair(position.pair, pairs)
  if (!pair) {
    return 0
  }
  return (pair.price - position.buy_price) * position.quantity
}

export function pnlPercentageLive(position: Position, pairs: Pair[]): number {
  const pair: Pair | undefined = getPair(position.pair, pairs)
  if (!pair) {
    return 0
  }
  return ((pair.price - position.buy_price) / position.buy_price) * 100
}
