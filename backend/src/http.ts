import cors from 'cors'
import express from 'express'
import signinRouter from './routes/signin.route'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/sign-in', signinRouter)

export { app }
