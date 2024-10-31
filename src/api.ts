import type { Dashboard } from './models/dashboard.ts'
import type { Log } from './models/log.ts'
import type { Position } from './models/position.ts'
import type { Pair } from './models/pair.ts'
import type { Balance } from './models/balance.ts'
import type { Prediction } from './models/prediction.ts'
import type { SearchCriteria } from './models/search-criteria.ts'
import type { Pagination } from './models/pagination.ts'
import { buildQueryParams } from './helpers/search-criteria-helper.ts'
import type { Indicator } from './models/indicator.ts'
import type { Holding } from './models/holding.ts'

const api = import.meta.env.PUBLIC_API

export async function getHealthCheck(): Promise<boolean> {
  const response: Response = await fetch(api)
  return response.ok
}

export async function getPositions(
  searchCriteria: SearchCriteria,
): Promise<{ data: Position[]; pagination: Pagination }> {
  const params: URLSearchParams = buildQueryParams(searchCriteria)
  const response: Response = await fetch(`${api}positions?${params.toString()}`)
  return await response.json()
}

export async function getPosition(id: number): Promise<Position> {
  const response: Response = await fetch(api + `positions/${id}`)
  const json = await response.json()
  return json.data
}

export async function getPairs(): Promise<Pair[]> {
  const response: Response = await fetch(api + 'pairs')
  const json = await response.json()
  return json.data
}

export async function getPredictions(
  searchCriteria: SearchCriteria,
): Promise<{ data: Prediction[]; pagination: Pagination }> {
  const params: URLSearchParams = buildQueryParams(searchCriteria)
  const response: Response = await fetch(
    `${api}predictions?${params.toString()}`,
  )
  return await response.json()
}

export async function getIndicators(
  searchCriteria: SearchCriteria,
): Promise<{ data: Indicator[]; pagination: Pagination }> {
  const params: URLSearchParams = buildQueryParams(searchCriteria)
  const response: Response = await fetch(
    `${api}indicators?${params.toString()}`,
  )
  return await response.json()
}

export async function getBalances(): Promise<Balance[]> {
  const response: Response = await fetch(api + 'balances')
  const json = await response.json()
  return json.data
}

export async function getLogs(
  searchCriteria: SearchCriteria,
): Promise<{ data: Log[]; pagination: Pagination }> {
  const params: URLSearchParams = buildQueryParams(searchCriteria)
  const response: Response = await fetch(`${api}logs?${params.toString()}`)
  return await response.json()
}

export async function getDashboard(): Promise<Dashboard> {
  const response: Response = await fetch(api + 'dashboard')
  return (await response.json()).data as Dashboard
}

export async function getHoldingsGraph(
  from: Date,
  to: Date,
): Promise<Holding[]> {
  const queryParams: string = `from=${from.toISOString().split('T')[0]}&to=${to.toISOString().split('T')[0]}`
  const response: Response = await fetch(api + `graph/holdings?${queryParams}`)
  const json = await response.json()
  return json.data
}

export async function getPredictionsGraph(
  pair: string,
  from: Date,
  to: Date,
): Promise<Prediction[]> {
  const queryParams: string = `pair=${pair}&from=${from.toISOString().split('T')[0]}&to=${to.toISOString().split('T')[0]}`
  const response: Response = await fetch(
    api + `graph/predictions?${queryParams}`,
  )
  const json = await response.json()
  return json.data
}

export async function getIndicatorsGraph(
  pair: string,
  indicator: string,
  from: Date,
  to: Date,
): Promise<Indicator[]> {
  const queryParams: string = `pair=${pair}&indicator=${indicator}&from=${from.toISOString().split('T')[0]}&to=${to.toISOString().split('T')[0]}`
  const response: Response = await fetch(
    api + `graph/indicators?${queryParams}`,
  )
  const json = await response.json()
  return json.data
}
