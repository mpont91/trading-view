export class FetchPositionsException extends Error {
  constructor(error: unknown) {
    super('Error fetching positions')
  }
}
export class FetchMarketsException extends Error {
  constructor(error: unknown) {
    super('Error fetching markets')
  }
}
export class FetchBalancesException extends Error {
  constructor(error: unknown) {
    super('Error fetching balances')
  }
}
export class FetchLogsException extends Error {
  constructor(error: unknown) {
    super('Error fetching logs')
  }
}
export class HealthCheckException extends Error {
  constructor(error: unknown) {
    super('Error getting the healthcheck')
  }
}

export class DashboardException extends Error {
  constructor(error: unknown) {
    super('Error getting the dashboard')
  }
}
