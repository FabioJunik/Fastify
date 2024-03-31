import 'dotenv/config'
import { knex as setupKnex, type Knex } from 'knex'

console.log(process.env)
export const knexConfig: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: process.env.DATABASE_URL || ' '
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: process.env.DATABASE_URL
  }
}

export const knex = setupKnex(knexConfig)
