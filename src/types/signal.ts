import { z } from 'zod'

export enum Signal {
  BUY = 'BUY',
  SELL = 'SELL',
  HOLD = 'HOLD',
}

export const signalSchema = z.enum(Signal)
