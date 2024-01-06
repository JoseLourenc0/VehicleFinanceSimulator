import path from 'path'
import { Knex } from 'knex'

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DATABASE,
  NODE_ENV
} = process.env

const testEnv = NODE_ENV === 'test'

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: MYSQL_HOST || 'localhost',
    user: MYSQL_USER || 'root',
    password: MYSQL_PASS || 'root',
    database: MYSQL_DATABASE || `vehicle_finances_simulator${testEnv ? '_test' : ''}`,
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
  useNullAsDefault: true,
}

export default config
