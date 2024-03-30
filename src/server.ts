import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/', async () => {
  const test = await knex('sqlite_schema').select('*')
  return test
})

app.listen({ port: 8888 }).then(() => {
  console.log('Server is runnig in 8888')
})
