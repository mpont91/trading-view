import { z } from 'zod'

export const portfolioSchema = z.object({
  timestamp: z.coerce.date(),
  equity: z.number(),
  bnb: z.number(),
})

export type Portfolio = z.infer<typeof portfolioSchema>
