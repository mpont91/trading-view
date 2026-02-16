import { OrderSide } from '../schemas/order.ts'
import { AdviceAction } from '../schemas/advice.ts'
import { PositionStatus } from '../schemas/position.ts'

export interface Option {
  value: string
  label: string
}

const ORDER_SIDE_LABELS: Record<OrderSide, string> = {
  [OrderSide.BUY]: 'Buy',
  [OrderSide.SELL]: 'Sell',
}

const ADVICE_ACTION_LABELS: Record<AdviceAction, string> = {
  [AdviceAction.BUY]: 'Buy',
  [AdviceAction.SELL]: 'Sell',
  [AdviceAction.HOLD]: 'Hold',
}

const POSITION_STATUS_LABELS: Record<PositionStatus, string> = {
  [PositionStatus.OPEN]: 'Open',
  [PositionStatus.CLOSED]: 'Closed',
}

export function getOrderSideOptions(): Option[] {
  const options = Object.values(OrderSide).map((side) => ({
    value: side,
    label: ORDER_SIDE_LABELS[side],
  }))

  return [{ value: '', label: 'All sides' }, ...options]
}

export function getAdviceActionOptions(): Option[] {
  const options = Object.values(AdviceAction).map((action) => ({
    value: action,
    label: ADVICE_ACTION_LABELS[action],
  }))

  return [{ value: '', label: 'All actions' }, ...options]
}

export function getPositionStatusOptions(): Option[] {
  const options = Object.values(PositionStatus).map((action) => ({
    value: action,
    label: POSITION_STATUS_LABELS[action],
  }))

  return [{ value: '', label: 'All status' }, ...options]
}
