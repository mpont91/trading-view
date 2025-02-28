import type { Performance } from '../types/performance.ts'
export function createEmptyPerformance(): Performance {
  return {
    trades: 0,
    success: 0,
    failed: 0,
    pnl: 0,
    fees: 0,
    net: 0,
  }
}
