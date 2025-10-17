import { z } from 'zod'

export const equitySchema = z.object({
  id: z.number().int(),
  amount: z.number(),
  createdAt: z.date(),
})

export type Equity = z.infer<typeof equitySchema>
