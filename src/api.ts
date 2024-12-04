import type { Holding } from './models/holding.ts'
import type { TimeInterval } from './types/time-interval.ts'
import type { Performance } from './types/performance.ts'

const api = import.meta.env.PUBLIC_API

export async function getHealthCheck(): Promise<boolean> {
  const response: Response = await fetch(api)
  return response.ok
}

export async function getHoldingGraph(
  interval: TimeInterval,
): Promise<Holding[]> {
  const queryParams: string = `interval=${interval}`
  const endpoint: string = `graph/holding?${queryParams}`
  return fetchJsonData<Holding[]>(endpoint)
}

export async function getPerformance(): Promise<Performance> {
  const endpoint: string = 'performance'
  return fetchJsonData<Performance>(endpoint)
}

async function fetchJsonData<T>(endpoint: string): Promise<T> {
  const response: Response = await fetch(api + endpoint)
  const json = await response.json()
  return json.data
}
