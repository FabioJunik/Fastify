import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'test', 'development']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(8888)
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variable : ', _env.error)

  throw new Error()
}

export const env = _env.data
