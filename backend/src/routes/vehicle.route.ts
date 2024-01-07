import { Router } from 'express'
import vehicleController from '../controller/vehicle.controller'
import { authMiddleware } from '../middlewares/auth'

const vehicleRouter = Router()

vehicleRouter.get('/', vehicleController.getAll)
vehicleRouter.get('/:id', vehicleController.getById)
vehicleRouter.post('/', authMiddleware as any, vehicleController.create)
vehicleRouter.delete(
  '/:id',
  authMiddleware as any,
  vehicleController.deleteById,
)

export default vehicleRouter
