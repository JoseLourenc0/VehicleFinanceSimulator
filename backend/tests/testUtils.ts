import { randomUUID } from 'crypto'
import userService from '../src/services/user.service'
import customerService from '../src/services/customer.service'
import vehicleService from '../src/services/vehicle.service'

export const newVehicle = () =>
  vehicleService.createVehicle({
    brand: randomUUID(),
    color: randomUUID(),
    model: randomUUID(),
  })

export const newCustomer = () =>
  customerService.createCustomer({
    cpf: randomUUID(),
    email: randomUUID(),
    name: randomUUID(),
    phone: randomUUID(),
  })

export const newUser = () =>
  userService.createUser({
    password: randomUUID(),
    username: randomUUID(),
  })
