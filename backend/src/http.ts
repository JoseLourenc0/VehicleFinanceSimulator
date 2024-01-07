import cors from 'cors'
import express from 'express'
import signinRouter from './routes/signin.route'
import vehicleRouter from './routes/vehicle.route'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/sign-in', signinRouter)
app.use('/vehicles', vehicleRouter)

export { app }
