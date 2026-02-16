import { z } from 'zod'
import type { EvaluationFilter } from '../filters/evaluation-filter.ts'
import type { Paginated } from '../schemas/paginated.ts'
import {
  type Evaluation,
  evaluationPaginatedSchema,
} from '../schemas/evaluation.ts'
import type { OrderFilter } from '../filters/order-filter.ts'
import { type Order, orderPaginatedSchema } from '../schemas/order.ts'
import { type Position, positionPaginatedSchema } from '../schemas/position.ts'
import type { PositionFilter } from '../filters/position-filter.ts'

export class TradingApi {
  private readonly baseUrl: string

  constructor() {
    const apiUrl: string = import.meta.env.PUBLIC_API
    this.baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl
  }

  async getHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/uptime`)
      return res.ok
    } catch {
      return false
    }
  }

  async getUptime(): Promise<number> {
    const json = await this.request('/uptime')
    const UptimeSchema = z.object({
      data: z.number(),
    })
    const result = UptimeSchema.parse(json)

    return result.data
  }

  async getEvaluations(
    filters?: EvaluationFilter,
  ): Promise<Paginated<Evaluation>> {
    const params = filters
      ? this.toQueryParams(filters as Record<string, unknown>)
      : undefined

    const json = await this.request('/evaluations', params)

    return evaluationPaginatedSchema.parse(json)
  }

  async getOrders(filters?: OrderFilter): Promise<Paginated<Order>> {
    const params = filters
      ? this.toQueryParams(filters as Record<string, unknown>)
      : undefined

    const json = await this.request('/orders', params)
    return orderPaginatedSchema.parse(json)
  }

  async getPositions(filters?: PositionFilter): Promise<Paginated<Position>> {
    const params = filters
      ? this.toQueryParams(filters as Record<string, unknown>)
      : undefined

    const json = await this.request('/positions', params)
    return positionPaginatedSchema.parse(json)
  }

  private async request(
    endpoint: string,
    params?: URLSearchParams,
  ): Promise<unknown> {
    const url = new URL(`${this.baseUrl}${endpoint}`)

    if (params) {
      url.search = params.toString()
    }

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  private toQueryParams(filters: Record<string, unknown>): URLSearchParams {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (value instanceof Date) {
          params.append(key, value.toISOString())
        } else {
          params.append(key, String(value))
        }
      }
    })

    return params
  }
}
