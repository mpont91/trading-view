export class FetchPositionsException extends Error {
  constructor(error: unknown) {
    super('Error fetching positions')
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
