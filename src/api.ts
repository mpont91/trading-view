import type { Dashboard } from './models/dashboard.ts'
import type { Log } from './models/log.ts'
import type { Position } from './models/position.ts'
import type { Market } from './models/market.ts'
import type { Balance } from './models/balance.ts'
import type { Prediction } from './models/prediction.ts'
import type { SearchCriteria } from './models/search-criteria.ts'
import type { Pagination } from './models/pagination.ts'

import {
  DashboardException,
  FetchLogsException,
  FetchPositionsException,
  FetchMarketsException,
  HealthCheckException,
  FetchPredictionsException,
  FetchBalancesException,
  FetchIndicatorsException,
} from './exceptions.ts'
import { buildQueryParams } from './utils.ts'
import type { Indicator } from './models/indicator.ts'

const api = import.meta.env.PUBLIC_API

export async function getHealthCheck(): Promise<boolean> {
  try {
    const response: Response = await fetch(api)
    return response.ok
  } catch (error: unknown) {
    throw new HealthCheckException(error)
  }
}

export async function getPositions(
  searchCriteria: SearchCriteria,
): Promise<{ data: Position[]; pagination: Pagination }> {
  const params: URLSearchParams = buildQueryParams(searchCriteria)
  try {
    console.log(`${api}positions?${params.toString()}`)
    const response: Response = await fetch(
      `${api}positions?${params.toString()}`,
    )
    return await response.json()
  } catch (error: unknown) {
    throw new FetchPositionsException(error)
  }
}

export async function getMarkets(): Promise<Market[]> {
  try {
    const response: Response = await fetch(api + 'markets')
    const json = await response.json()
    return json.data
  } catch (error: unknown) {
    throw new FetchMarketsException(error)
  }
}

export async function getPredictions(
  searchCriteria: SearchCriteria,
): Promise<{ data: Prediction[]; pagination: Pagination }> {
  const params: URLSearchParams = buildQueryParams(searchCriteria)
  try {
    const response: Response = await fetch(
      `${api}predictions?${params.toString()}`,
    )
    return await response.json()
  } catch (error: unknown) {
    throw new FetchPredictionsException(error)
  }
}

export async function getIndicators(
  searchCriteria: SearchCriteria,
): Promise<{ data: Indicator[]; pagination: Pagination }> {
  const params: URLSearchParams = buildQueryParams(searchCriteria)
  try {
    const response: Response = await fetch(
      `${api}indicators?${params.toString()}`,
    )
    return await response.json()
  } catch (error: unknown) {
    throw new FetchIndicatorsException(error)
  }
}

export async function getBalances(): Promise<Balance[]> {
  try {
    const response: Response = await fetch(api + 'balances')
    const json = await response.json()
    return json.data
  } catch (error: unknown) {
    throw new FetchBalancesException(error)
  }
}

export async function getLogs(
  searchCriteria: SearchCriteria,
): Promise<{ data: Log[]; pagination: Pagination }> {
  const params: URLSearchParams = buildQueryParams(searchCriteria)
  try {
    const response: Response = await fetch(`${api}logs?${params.toString()}`)
    return await response.json()
  } catch (error: unknown) {
    throw new FetchLogsException(error)
  }
}

export async function getDashboard(): Promise<Dashboard> {
  try {
    const response: Response = await fetch(api + 'dashboard')
    return (await response.json()).data as Dashboard
  } catch (error: unknown) {
    throw new DashboardException(error)
  }
}
