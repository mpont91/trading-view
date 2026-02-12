import { z } from 'zod'
import { adviceSchema } from './advice.ts'
import { createPaginatedSchema } from './paginated.ts'

export const evaluationSchema = z.object({
  id: z.number(),
  ...adviceSchema.shape,
  symbol: z.string(),
  price: z.number(),
  model: z.string(),
  createdAt: z.coerce.date(),
})

export const evaluationPaginatedSchema = createPaginatedSchema(evaluationSchema)

export type Evaluation = z.infer<typeof evaluationSchema>
