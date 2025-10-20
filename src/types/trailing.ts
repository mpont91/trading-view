import { z } from 'zod'

export const trailingSchema = z.object({
  symbol: z.string(),
  tp: z.number(),
  sl: z.number(),
  ts: z.number(),
  tpPrice: z.number(),
  slPrice: z.number(),
  tsPrice: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Trailing = z.infer<typeof trailingSchema>
