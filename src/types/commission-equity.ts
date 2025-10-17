import { z } from 'zod'

export const commissionEquitySchema = z.object({
  id: z.number().int(),
  currency: z.string(),
  quantity: z.number(),
  amount: z.number(),
  createdAt: z.date(),
})

export type CommissionEquity = z.infer<typeof commissionEquitySchema>
