import rateLimit from 'express-rate-limit'

const testEnv = process.env.NODE_ENV === 'test'

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: testEnv ? 1000 : 10,
  message: 'Too many requests, please try again later',
})

export default limiter
