import Redis from 'ioredis'

const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : undefined

export async function getOdAuthTokens(): Promise<{ accessToken: unknown; refreshToken: unknown }> {
  if (!redis) {
    throw new Error('REDIS_URL is not defined in environment variables')
  }

  const accessToken = await redis.get('access_token')
  const refreshToken = await redis.get('refresh_token')

  return {
    accessToken,
    refreshToken,
  }
}

export async function storeOdAuthTokens({
  accessToken,
  accessTokenExpiry,
  refreshToken,
}: {
  accessToken: string
  accessTokenExpiry: number
  refreshToken: string
}): Promise<void> {
  if (!redis) {
    throw new Error('REDIS_URL is not defined in environment variables')
  }

  await redis.set('access_token', accessToken, 'EX', accessTokenExpiry)
  await redis.set('refresh_token', refreshToken)
}
