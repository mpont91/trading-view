export type Level = 'info' | 'debug' | 'error'
export type Layer = 'Domain' | 'Application' | 'Infrastructure'

export interface Log {
  timestamp: string
  level: Level
  message: string
}
