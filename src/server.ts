import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/transitions', async () => {
  const transition = await knex('transitions').select('*')
  return transition
})

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is runnig in ${env.PORT}`)
})
