import { z } from 'zod'
import { paginationQuerySchema } from './pagination-filter'
import { dateQuerySchema } from './date-filter'
import { adviceActionSchema } from '../schemas/advice.ts'

export const evaluationFilterSchema = z.object({
  ...paginationQuerySchema.shape,
  ...dateQuerySchema.shape,
  symbol: z
    .string()
    .optional()
    .transform((val) => val?.toUpperCase()),
  action: adviceActionSchema.optional(),
})

export type EvaluationFilter = z.infer<typeof evaluationFilterSchema>
