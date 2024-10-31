import type { Position } from '../models/position.ts'

export function showPositionLink(position: Position): void {
  const url: string = `/positions/${position.id}`
  window.open(url, '_blank')
}

export const fieldsMapping: { name: string; value: string }[] = [
  { name: 'id', value: 'id' },
  { name: 'pair', value: 'pair' },
  { name: 'amount $', value: 'amount' },
  { name: 'buy price $', value: 'buy_price' },
  { name: 'buy at', value: 'buy_at' },
  { name: 'sell price $', value: 'sell_price' },
  { name: 'sell at', value: 'sell_at' },
  { name: 'pnl $', value: 'pnl' },
  { name: 'pnl %', value: 'pnl_percentage' },
]

export function pnlClass(pnl: number) {
  return {
    'bg-blue-950 text-blue-300': pnl === 0,
    'bg-green-950': pnl > 0,
    'bg-red-950': pnl < 0,
  }
}
