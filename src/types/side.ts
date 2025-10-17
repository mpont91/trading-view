import { z } from 'zod'

export enum Side {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

export const sideSchema = z.enum(Side)
