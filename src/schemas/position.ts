import { z } from 'zod'
import { createPaginatedSchema } from './paginated.ts'

export const positionStatusSchema = z.enum(['OPEN', 'CLOSED'])

export const positionSchema = z.object({
  id: z.number().int().optional(),
  symbol: z.string(),
  status: positionStatusSchema,
  quantity: z.number().positive(),
  entryPrice: z.number().positive(),
  entryTime: z.coerce.date(),
  exitPrice: z.number().positive().nullable().optional(),
  exitTime: z.coerce.date().nullable().optional(),
  buyOrderId: z.number().int(),
  sellOrderId: z.number().int().nullable().optional(),
  pnl: z.number().nullable().optional(),
  pnlPercent: z.number().nullable().optional(),
  currentPrice: z.number().positive().optional(),
})

export const positionPaginatedSchema = createPaginatedSchema(positionSchema)

export type Position = z.infer<typeof positionSchema>
export type PositionStatus = z.infer<typeof positionStatusSchema>
