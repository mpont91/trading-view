import { strategyStopsSchema } from './strategy-stops'
import { strategyConditionsSchema } from './strategy-conditions'
import { z } from 'zod'

export const strategyReportSchema = z
  .object({
    id: z.number().int(),
    symbol: z.string(),
    price: z.number(),
    conditions: strategyConditionsSchema,
    shouldBuy: z.boolean(),
    shouldSell: z.boolean(),
    createdAt: z.date(),
  })
  .extend(strategyStopsSchema.shape)

export type StrategyReport = z.infer<typeof strategyReportSchema>
