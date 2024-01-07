import { Router } from 'express'
import simulationController from '../controller/simulation.controller'
import { authMiddleware } from '../middlewares/auth'

const simulationRoute = Router()
simulationRoute.get('/', authMiddleware as any, simulationController.getAll)
simulationRoute.get('/:key/:accessKey', simulationController.getByAccessKey)
simulationRoute.post('/', simulationController.create)

export default simulationRoute
