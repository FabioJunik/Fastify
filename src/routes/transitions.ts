import { type FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { checkSessionExists } from '../meddlewares/check-session-exists'

export async function transitionsRoutes (app: FastifyInstance) {
  app.get('/', {
    preHandler: checkSessionExists
  }, async (request) => {
    const sessionId = request.cookies.sessionId

    const transitions = await knex('transitions').where({
      session_id: sessionId
    })

    return { transitions }
  })

  app.get('/:id', {
    preHandler: checkSessionExists
  }, async (request) => {
    const getTranstionParamsSchema = z.object({
      id: z.string().uuid()
    })

    const sessionId = request.cookies.sessionId
    const { id } = getTranstionParamsSchema.parse(request.params)

    const transitions = await knex('transitions').where({
      id,
      session_id: sessionId
    }).first()

    return { transitions }
  })

  app.get('/summary', {
    preHandler: checkSessionExists
  }, async (request) => {
    const sessionId = request.cookies.sessionId

    const summary = await knex('transitions')
      .sum('amount', { as: 'summary' })
      .where({ session_id: sessionId })
      .first()

    return { summary }
  })

  app.post('/', async (request, response) => {
    const createTransitionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })

    const { amount, title, type } = createTransitionBodySchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      response.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
    }

    await knex('transitions').insert({
      id: randomUUID(),
      amount: type === 'credit' ? amount : amount * -1,
      title,
      session_id: sessionId
    })

    return response.status(201).send()
  })
}
