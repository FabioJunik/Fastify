import { type FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'

export async function transitionsRoutes (app: FastifyInstance) {
  app.get('/', async () => {
    const transitions = await knex('transitions').select()

    return { transitions }
  })

  app.get('/:id', async (request) => {
    const getTranstionParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = getTranstionParamsSchema.parse(request.params)

    const transitions = await knex('transitions').where('id', id).first()

    return { transitions }
  })

  app.get('/summary', async () => {
    const summary = await knex('transitions').sum('amount', { as: 'summary' }).first()

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
