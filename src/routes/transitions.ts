import { type FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'

export async function transitionsRoutes (app: FastifyInstance) {
  app.get('/', async () => {
    const transitions = await knex('transitions').select()

    return { transitions }
  })

  app.post('/', async (request, response) => {
    const createTransitionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })

    const { amount, title, type } = createTransitionBodySchema.parse(request.body)

    await knex('transitions').insert({
      id: randomUUID(),
      amount: type === 'credit' ? amount : amount * -1,
      title
    })

    return response.status(201).send()
  })
}
