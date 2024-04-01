import { afterAll, beforeAll, describe, it } from 'vitest'
import supertest from 'supertest'
import { app } from '../server'

describe('Transitions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new trasition ', async () => {
    await supertest(app.server).post('/transitions').send({
      title: 'Super Teste de transação',
      amount: 100,
      type: 'credit'
    }).expect(201)
  })
})
