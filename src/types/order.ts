import { sideSchema } from './side'
import { z } from 'zod'

export const orderSchema = z.object({
  id: z.number().int(),
  orderId: z.string(),
  symbol: z.string(),
  side: sideSchema,
  quantity: z.number(),
  price: z.number(),
  amount: z.number(),
  fees: z.number(),
  createdAt: z.date(),
})

export type Order = z.infer<typeof orderSchema>
