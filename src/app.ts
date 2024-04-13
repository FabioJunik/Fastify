import fastify from 'fastify'
import { transitionsRoutes } from './routes/transitions'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)

app.register(transitionsRoutes, {
  prefix: 'transitions'
})

export { app }
