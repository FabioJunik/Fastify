import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') { config({ path: '.env.test' }) } else { config() }

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'test', 'development']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(8888)
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variable : ', _env.error)

  throw new Error()
}

export const env = _env.data
