import cors from 'cors'
import express from 'express'
import signinRouter from './routes/signin.route'
import vehicleRouter from './routes/vehicle.route'
import limiter from './middlewares/rate-limiter'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/sign-in', limiter, signinRouter)
app.use('/vehicles', limiter, vehicleRouter)

export { app }
