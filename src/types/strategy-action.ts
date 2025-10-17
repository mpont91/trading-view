import { signalSchema } from './signal'
import { strategyStopsSchema } from './strategy-stops'
import { z } from 'zod'

export const strategyActionSchema = z
  .object({
    id: z.number().int(),
    symbol: z.string(),
    price: z.number(),
    signal: signalSchema,
    createdAt: z.date(),
  })
  .extend(strategyStopsSchema.shape)

export type StrategyAction = z.infer<typeof strategyActionSchema>
