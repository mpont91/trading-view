import type { CommissionEquity } from '../types/commission-equity.ts'

export function createEmptyCommissionEquity(): CommissionEquity {
  return {
    id: 1,
    amount: 0,
    currency: 'BNB',
    quantity: 0,
    createdAt: new Date(),
  }
}
