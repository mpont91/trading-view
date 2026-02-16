import { z } from 'zod'
import { paginationQuerySchema } from './pagination-filter'
import { dateQuerySchema } from './date-filter'

export const positionFilterSchema = z.object({
  ...paginationQuerySchema.shape,
  ...dateQuerySchema.shape,
  symbol: z.string().optional(),
})

export type PositionFilter = z.infer<typeof positionFilterSchema>
