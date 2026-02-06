import { z } from 'zod'

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

  private toQueryParams(filters: Record<string, any>): URLSearchParams {
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
