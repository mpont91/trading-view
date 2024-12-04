export function formatAmount(amount?: number): string {
  if (amount === null || amount === undefined) return ''

  return `$ ${amount.toFixed(2)}`
}
