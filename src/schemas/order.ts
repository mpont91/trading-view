import { z } from 'zod'
import { createPaginatedSchema } from './paginated.ts'

export const orderSideSchema = z.enum(['BUY', 'SELL'])

export const orderSchema = z.object({
  id: z.number(),
  exchangeOrderId: z.string(),
  symbol: z.string(),
  side: orderSideSchema,
  quantity: z.number(),
  price: z.number(),
  cost: z.number(),
  fees: z.number(),
  createdAt: z.coerce.date(),
})

export const orderPaginatedSchema = createPaginatedSchema(orderSchema)

export type Order = z.infer<typeof orderSchema>
export type OrderSide = z.infer<typeof orderSideSchema>
