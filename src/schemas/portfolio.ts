import { z } from 'zod'

export const portfolioSchema = z.object({
  timestamp: z.coerce.date(),
  totalEquity: z.number(),
  tradingEquity: z.number(),
  bnb: z.number(),
})

export type Portfolio = z.infer<typeof portfolioSchema>
