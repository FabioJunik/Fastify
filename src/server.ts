import fastify from 'fastify'
import { env } from './env'
import { transitionsRoutes } from './routes/transitions'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)

app.register(transitionsRoutes, {
  prefix: 'transitions'
})

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is runnig in ${env.PORT}`)
})
