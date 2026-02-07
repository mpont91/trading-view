import { z } from 'zod'

export const orderSideSchema = z.enum(['BUY', 'SELL'])

export const orderSchema = z.object({
  id: z.string(),
  exchangeOrderId: z.string(),
  symbol: z.string(),
  side: orderSideSchema,
  quantity: z.number(),
  price: z.number(),
  cost: z.number(),
  fees: z.number(),
  createdAt: z.coerce.date(),
})

export type Order = z.infer<typeof orderSchema>
export type OrderSide = z.infer<typeof orderSideSchema>
