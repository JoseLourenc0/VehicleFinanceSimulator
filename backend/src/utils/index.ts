import moment from 'moment'
import { green, red } from 'cli-color'
const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

const getHeaderColor = (type: 'default' | 'error', message: string) => {
    return type === 'default' ? green(message) : red(message)
}

export const log = (logInfo: any, type: 'default' | 'error' = 'default') => {
    const header = getHeaderColor(type, `[${moment().format(DEFAULT_DATE_TIME_FORMAT)}]`)
    if (type === 'error') console.error(header, logInfo)
    else console.log(header, logInfo)
}

export class UserException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'UserException'
    }
}
