import { ref, computed, watch, type Ref } from 'vue'
import { TradingApiService } from '../services/trading-api-service'
import { BinanceApiService } from '../services/binance-api-service'
import { usePaginatedList } from './use-paginated-list'
import type { PositionFilter } from '../filters/position-filter'
import type { Position } from '../schemas/position'
import type { Paginated } from '../schemas/paginated.ts'

export function useLivePositions(filters: Ref<PositionFilter>) {
  const api = new TradingApiService()
  const binanceApi = new BinanceApiService()

  const {
    data: baseData,
    loading,
    error,
    retry,
    changePage,
  } = usePaginatedList((f) => api.getPositions(f), filters)

  const livePrices = ref<Record<string, number>>({})

  watch(
    () => baseData.value?.data,
    async (positions) => {
      if (!positions) return
      const openSymbols = [
        ...new Set(
          positions.filter((p) => p.status === 'OPEN').map((p) => p.symbol),
        ),
      ]

      if (openSymbols.length > 0) {
        livePrices.value = await binanceApi.getPrices(openSymbols)
      }
    },
    { immediate: true },
  )

  const enrichedData = computed<Paginated<Position> | null>(() => {
    if (!baseData.value) return null

    return {
      ...baseData.value,
      data: baseData.value.data.map((item): Position => {
        if (item.status === 'CLOSED') {
          return item
        }

        const currentPrice = livePrices.value[item.symbol]

        if (!currentPrice) {
          return item
        }

        const pnl = (currentPrice - item.entryPrice) * item.quantity
        const pnlPercent =
          ((currentPrice - item.entryPrice) / item.entryPrice) * 100

        return {
          ...item,
          currentPrice,
          pnl,
          pnlPercent,
        }
      }),
    }
  })

  return {
    data: enrichedData,
    loading,
    error,
    retry,
    changePage,
  }
}
