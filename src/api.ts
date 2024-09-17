import type { Dashboard, Log, Position, Market } from './types'
import {
  DashboardException,
  FetchLogsException,
  FetchPositionsException,
  FetchMarketsException,
  HealthCheckException,
} from './exceptions.ts'

const api = import.meta.env.PUBLIC_API

export async function getPositions(): Promise<Position[]> {
  try {
    const response: Response = await fetch(api + 'positions')
    const json = await response.json()
    return json.data
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

export async function getLogs(): Promise<Log[]> {
  try {
    const response: Response = await fetch(api + 'logs')
    const json = await response.json()
    return json.data
  } catch (error: unknown) {
    throw new FetchLogsException(error)
  }
}

export async function getHealthCheck(): Promise<boolean> {
  try {
    const response: Response = await fetch(api)
    return response.ok
  } catch (error: unknown) {
    throw new HealthCheckException(error)
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
