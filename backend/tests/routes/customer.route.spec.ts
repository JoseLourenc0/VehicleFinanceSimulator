import supertest from 'supertest'
import { describe, it, expect, vitest } from 'vitest'
import { randomUUID } from 'crypto'
import { app } from '../../src/http'
import customerService from '../../src/services/customer.service'
import { getToken, newCustomer, newVehicle } from '../testUtils'

describe('/customers', () => {
  describe('GET - /', () => {
    it('Should get all customers', async () => {
      const token = await getToken()
      const response = await supertest(app)
        .get('/customers')
        .set('Authorization', token)
      expect(response.status).toBe(200)
      expect(response.body.customers).toBeDefined()
    })

    it('Should handle error when fetching all customers', async () => {
      const token = await getToken()
      vitest
        .spyOn(customerService, 'getAllCustomers')
        .mockRejectedValueOnce(new Error('Simulated error'))

      const response = await supertest(app)
        .get('/customers')
        .set('Authorization', token)
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Falha ao buscar clientes')
    })
  })

  describe('GET - /:id', () => {
    it('Should get a vehicle by ID', async () => {
      const customer = await newCustomer()
      const response = await supertest(app).get(`/customers/${customer}`)
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
    })

    it('Should handle error when fetching vehicle by ID', async () => {
      vitest
        .spyOn(customerService, 'getCustomerById')
        .mockRejectedValueOnce(new Error('Simulated error'))

      const response = await supertest(app).get('/customers/1')
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Falha ao buscar dados do cliente')
    })
  })

  describe('POST - /', () => {
    it('Should create a new customer when authenticated', async () => {
      const token = await getToken()
      const response = await supertest(app)
        .post('/customers')
        .set('Authorization', token)
        .send({
          cpf: randomUUID(),
          name: randomUUID(),
          email: randomUUID(),
          phone: randomUUID(),
        })

      expect(response.status).toBe(200)
      expect(response.body.customer).toBeDefined()
    })

    it('Should handle error when creating a customer with missing data', async () => {
      const token = await getToken()
      const response = await supertest(app)
        .post('/customers')
        .send({})
        .set('Authorization', token)

      expect(response.status).toBe(400)
      expect(response.body.error).toBe(
        'Necessário informar todos os dados do Cliente!',
      )
    })
  })

  describe('DELETE - /:id', () => {
    it('Should return forbidden when not authenticated', async () => {
      const vehicle = await newVehicle()
      const response = await supertest(app).delete(`/customers/${vehicle}`)

      expect(response.status).toBe(403)
    })

    it('Should delete a vehicle by ID', async () => {
      const token = await getToken()
      const vehicle = await newVehicle()
      const response = await supertest(app)
        .delete(`/customers/${vehicle}`)
        .set('Authorization', token)

      expect(response.status).toBe(204)
    })

    it('Should handle error when deleting a vehicle by invalid ID', async () => {
      const token = await getToken()
      const response = await supertest(app)
        .delete('/customers/invalid_id')
        .set('Authorization', token)

      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Necessário informar id do cliente')
    })
  })
})
