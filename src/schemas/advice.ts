import { z } from 'zod'

export const adviceActionSchema = z.enum(['BUY', 'SELL', 'HOLD'])

export const adviceSchema = z.object({
  action: adviceActionSchema,
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
})

export type Advice = z.infer<typeof adviceSchema>
export type AdviceAction = z.infer<typeof adviceActionSchema>
