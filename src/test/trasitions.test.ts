import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import supertest from 'supertest'
import { app } from '../app'
import { execSync } from 'node:child_process'

describe('Transitions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  afterEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new trasition', async () => {
    await supertest(app.server).post('/transitions').send({
      title: 'Super Teste de transação',
      amount: 100,
      type: 'credit'
    }).expect(201)
  })

  it('should be able to list all trasictions', async () => {
    const createTransitionResponse = await supertest(app.server)
      .post('/transitions')
      .send({
        title: 'New Super Teste de transação',
        amount: 100,
        type: 'credit'
      })

    const cookies = createTransitionResponse.get('Set-Cookie') || []

    const listTransitionsResponse = await supertest(app.server)
      .get('/transitions')
      .set('Cookie', cookies)
      .expect(200)

    const { transitions } = listTransitionsResponse.body

    expect(transitions).toEqual([
      expect.objectContaining({
        title: 'New Super Teste de transação',
        amount: 100
      })
    ])
  })
})
