import { randomUUID } from 'crypto'
import supertest from 'supertest'
import userService from '../src/services/user.service'
import customerService from '../src/services/customer.service'
import vehicleService from '../src/services/vehicle.service'
import { app } from '../src/http'

export const newVehicle = () =>
  vehicleService.createVehicle({
    brand: `testBrand_${randomUUID()}`,
    color: `testColor_${randomUUID()}`,
    model: `testModel_${randomUUID()}`,
  })

export const newCustomer = () =>
  customerService.createCustomer({
    cpf: `testCPF_${randomUUID()}`,
    email: `testEmail_${randomUUID()}`,
    name: `testName_${randomUUID()}`,
    phone: `testPhone_${randomUUID()}`,
  })

export const newUser = () =>
  userService.createUser({
    password: randomUUID(),
    username: `testUser_${randomUUID()}`,
  })

export const getToken = async () => {
  const req: any = supertest(app).post('/sign-in').send({
    user: 'root',
    password: 'S3CUR3_P455W0RD',
  })
  const { _body: tokenGET } = await req
  return `Bearer ${tokenGET.token}`
}
