import { z } from 'zod'
import { timeFrameSchema } from './time-frame.ts'
import { adviceSchema } from './advice.ts'

export const evaluationSchema = z.object({
  id: z.string(),
  ...adviceSchema.shape,
  symbol: z.string(),
  price: z.number(),
  timeFrame: timeFrameSchema,
  model: z.string(),
  createdAt: z.coerce.date(),
})

export type Evaluation = z.infer<typeof evaluationSchema>
