import { Router } from 'express'
import { signInRoute } from '../middlewares/auth'

const signinRouter = Router()

signinRouter.post('/', signInRoute)

export default signinRouter
