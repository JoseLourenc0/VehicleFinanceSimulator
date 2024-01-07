import cors from 'cors'
import express from 'express'
import signinRouter from './routes/signin.route'
import vehicleRouter from './routes/vehicle.route'
import limiter from './middlewares/rate-limiter'
import customerRouter from './routes/customer.route'
import simulationRoute from './routes/simulation.route'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/sign-in', limiter, signinRouter)
app.use('/vehicles', limiter, vehicleRouter)
app.use('/customers', limiter, customerRouter)
app.use('/simulations', limiter, simulationRoute)

export { app }
