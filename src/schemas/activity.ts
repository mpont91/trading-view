import { z } from 'zod'
import { createPaginatedSchema } from './paginated.ts'

export const activityLevelSchema = z.enum(['INFO', 'WARN', 'SUCCESS', 'ERROR'])

export const activitySchema = z.object({
  id: z.number().int(),
  level: activityLevelSchema,
  context: z.string(),
  message: z.string(),
  createdAt: z.coerce.date(),
})

export type Activity = z.infer<typeof activitySchema>
export type ActivityLevel = z.infer<typeof activityLevelSchema>

export const activityPaginatedSchema = createPaginatedSchema(activitySchema)
