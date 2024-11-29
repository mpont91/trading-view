import type { Holding } from './models/holding.ts'
import type { TimeInterval } from './types/time-interval.ts'

const api = import.meta.env.PUBLIC_API

export async function getHealthCheck(): Promise<boolean> {
  const response: Response = await fetch(api)
  return response.ok
}

export async function getHoldingGraph(
  interval: TimeInterval,
): Promise<Holding[]> {
  const queryParams: string = `interval=${interval}`
  const response: Response = await fetch(api + `graph/holding?${queryParams}`)
  const json = await response.json()
  return json.data
}
