import type { Log, Position } from './types'

const api = import.meta.env.API

export async function getPositions(): Promise<Position[]> {
  const response: Response = await fetch(api + 'positions')
  const json = await response.json()
  return json.data
}

export async function getLogs(): Promise<Log[]> {
  const response: Response = await fetch(api + 'logs')
  const json = await response.json()
  return json.data
}
