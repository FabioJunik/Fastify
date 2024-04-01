import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionExists (request: FastifyRequest, response: FastifyReply) {
  const { sessionId } = request.cookies

  if (!sessionId) {
    return response.status(401).send({ error: 'Unauthorized' })
  }
}
