export const sideOptions = ['Buy', 'Sell'] as const

export type Side = (typeof sideOptions)[number]
