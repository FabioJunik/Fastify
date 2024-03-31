import fastify from 'fastify'
import { env } from './env'
import { transitionsRoutes } from './routes/transitions'

const app = fastify()

app.register(transitionsRoutes, {
  prefix: 'transitions'
})

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is runnig in ${env.PORT}`)
})
