import type { Log, Position } from './types'
import { FetchPLogsException, FetchPositionsException } from './exceptions.ts'

const api = import.meta.env.API

export async function getPositions(): Promise<Position[]> {
  try {
    const response: Response = await fetch(api + 'positions')
    const json = await response.json()
    return json.data
  } catch (error: unknown) {
    throw new FetchPositionsException(error)
  }
}

export async function getLogs(): Promise<Log[]> {
  try {
    const response: Response = await fetch(api + 'logs')
    const json = await response.json()
    return json.data
  } catch (error: unknown) {
    throw new FetchPLogsException(error)
  }
}
