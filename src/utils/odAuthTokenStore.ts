import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

export async function getOdAuthTokens() {
  const accessToken = await redis.get('access_token')
  const refreshToken = await redis.get('refresh_token')
  return { accessToken, refreshToken }
}

export async function storeOdAuthTokens({ accessToken, accessTokenExpiry, refreshToken }: any) {
  await redis.set('access_token', accessToken, { ex: accessTokenExpiry })
  await redis.set('refresh_token', refreshToken)
}
