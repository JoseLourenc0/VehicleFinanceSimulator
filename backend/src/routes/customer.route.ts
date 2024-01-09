import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import customerController from '../controller/customer.controller'

const customerRouter = Router()

customerRouter.get('/', authMiddleware as any, customerController.getAll)
customerRouter.get('/cpf/:cpf', customerController.getByCPF)
customerRouter.get('/:id', customerController.getById)
customerRouter.post('/', customerController.create)
customerRouter.delete(
  '/:id',
  authMiddleware as any,
  customerController.deleteById,
)

export default customerRouter
