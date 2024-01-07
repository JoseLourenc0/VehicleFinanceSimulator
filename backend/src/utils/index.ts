/* eslint-disable camelcase */
import moment from 'moment'
import { green, red } from 'cli-color'

interface BaseTimestampEntity {
  created_at: Date
  deleted_at?: Date | null
  updated_at: Date
  [key: string]: any
}

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

export class RouteException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RouteException'
  }
}

export const handleErrorMessages = (error: any, alternativeMessage = '') => {
  if (error instanceof RouteException)
    return error.message.replace('Error: ', '')
  return alternativeMessage
}

export const formatTimestamps = (obj: BaseTimestampEntity, showAll = false) => {
  const { created_at, updated_at, deleted_at, ...props } = obj
  const createdAt = created_at
  const updatedAt = updated_at
  const deletedAt = deleted_at
  if (showAll)
    return {
      ...props,
      createdAt,
      updatedAt,
      deletedAt,
    }
  return {
    ...props,
    createdAt,
    updatedAt,
  }
}
