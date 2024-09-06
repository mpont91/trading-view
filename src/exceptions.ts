export class FetchPositionsException extends Error {
  constructor(error: unknown) {
    super('Error fetching positions')
  }
}
export class FetchPLogsException extends Error {
  constructor(error: unknown) {
    super('Error fetching logs')
  }
}
