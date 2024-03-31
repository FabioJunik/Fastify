import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/transitions', async () => {
  const transition = await knex('transitions').select('*')
  return transition
})

app.listen({ port: 8888 }).then(() => {
  console.log('Server is runnig in 8888')
})
