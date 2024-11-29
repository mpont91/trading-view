export const timeIntervalOptions: string[] = [
  'day',
  'week',
  'month',
  'year',
  'all',
] as const

export type TimeInterval = (typeof timeIntervalOptions)[number]
