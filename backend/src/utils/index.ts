import moment from 'moment'
import { green, red } from 'cli-color'

const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

const getHeaderColor = (type: 'default' | 'error', message: string) =>
  type === 'default' ? green(message) : red(message)

export const log = (logInfo: any, type: 'default' | 'error' = 'default') => {
  const formattedLogInfo = Array.isArray(logInfo) ? logInfo : [logInfo]
  const header = getHeaderColor(
    type,
    `[${moment().format(DEFAULT_DATE_TIME_FORMAT)}]`,
  )
  if (type === 'error') console.error(header, ...formattedLogInfo)
  else console.log(header, ...formattedLogInfo)
}

export class UserException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserException'
  }
}

export class CustomerException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CustomerException'
  }
}

export class VehicleException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'VehicleException'
  }
}

export class SimulationException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SimulationException'
  }
}
