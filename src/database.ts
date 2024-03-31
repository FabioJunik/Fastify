import { knex as setupKnex, type Knex } from 'knex'
import { env } from './env'

export const knexConfig: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: env.DATABASE_URL
  }
}

export const knex = setupKnex(knexConfig)
