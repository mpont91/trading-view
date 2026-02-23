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
import { type Performance, performanceSchema } from '../schemas/performance.ts'
import type { PositionFilter } from '../filters/position-filter.ts'

export class TradingApiService {
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
    const responseSchema = this.createApiResponseSchema(z.number())
    const result = responseSchema.parse(json)
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

  async getPerformance(): Promise<Performance> {
    const json = await this.request('/performance')
    const responseSchema = this.createApiResponseSchema(performanceSchema)
    const result = responseSchema.parse(json)
    return result.data
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

  private createApiResponseSchema<T extends z.ZodTypeAny>(schema: T) {
    return z.object({
      data: schema,
    })
  }
}
