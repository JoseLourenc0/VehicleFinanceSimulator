import { vitest, describe, it, expect } from 'vitest'
import supertest from 'supertest'
import { app } from '../../src/http'
import simulationService from '../../src/services/simulation.service'
import { getToken, newCustomer, newVehicle } from '../testUtils'
import vehicleService from '../../src/services/vehicle.service'
import customerService from '../../src/services/customer.service'

describe('/simulations', () => {
  describe('GET - /', () => {
    it('Should return forbidden when not authenticated', async () => {
      const response = await supertest(app).get('/simulations')

      expect(response.status).toBe(403)
    })

    it('Should get all simulations', async () => {
      const token = await getToken()
      const [vehicle1, vehicle2] = await Promise.all([
        newVehicle(),
        newVehicle(),
      ])
      const [customer1, customer2] = await Promise.all([
        newCustomer(),
        newCustomer(),
      ])
      vitest
        .spyOn(simulationService, 'getAllSimulations')
        .mockResolvedValueOnce([
          {
            id: 1,
            score: 800,
            vehicle_id: vehicle1,
            customer_id: customer1,
            processed: true,
            key: 'abc123',
            access_key: 'xyz789',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          },
          {
            id: 2,
            score: 600,
            vehicle_id: vehicle2,
            customer_id: customer2,
            processed: false,
            key: 'def456',
            access_key: 'uvw012',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          },
        ])

      const response = await supertest(app)
        .get('/simulations')
        .set('Authorization', token)
      expect(response.status).toBe(200)
      expect(response.body.simulations).toBeDefined()
    })

    it('Should handle error when fetching simulations', async () => {
      const token = await getToken()
      vitest
        .spyOn(simulationService, 'getAllSimulations')
        .mockRejectedValueOnce(new Error('Erro simulado'))

      const response = await supertest(app)
        .get('/simulations')
        .set('Authorization', token)
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Falha ao buscar Simulações')
    })
  })

  describe('GET - /:key/:accessKey', () => {
    it('Should get simulation by access key', async () => {
      vitest
        .spyOn(simulationService, 'getSimulationByKey')
        .mockResolvedValueOnce({
          id: 1,
          score: 800,
          processed: true,
          key: 'abc123',
          access_key: 'xyz789',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          vehicle_id: 1,
          customer_id: 1,
        })

      vitest.spyOn(vehicleService, 'getVehicleById').mockResolvedValueOnce({
        id: 1,
        brand: 'Toyota',
        color: 'Red',
        model: 'Camry',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      })

      vitest.spyOn(customerService, 'getCustomerById').mockResolvedValueOnce({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '123.456.789-00',
        phone: '123456789',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      })

      const response = await supertest(app).get('/simulations/abc123/xyz789')
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
    })

    it('Should handle error when fetching simulation by access key', async () => {
      vitest
        .spyOn(simulationService, 'getSimulationByKey')
        .mockRejectedValueOnce(new Error('Erro simulado'))

      const response = await supertest(app).get(
        '/simulations/invalid_key/invalid_access_key',
      )
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Falha ao buscar dados da simulação')
    })
  })

  describe('POST - /', () => {
    it('Should create a new simulation', async () => {
      vitest
        .spyOn(simulationService, 'createSimulation')
        .mockResolvedValueOnce({
          key: 'abc123',
          accessKey: 'xyz789',
        })

      vitest.spyOn(vehicleService, 'getVehicleById').mockResolvedValueOnce({
        id: 1,
        brand: 'Toyota',
        color: 'Red',
        model: 'Camry',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      })

      vitest.spyOn(customerService, 'getCustomerById').mockResolvedValueOnce({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '123.456.789-00',
        phone: '123456789',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      })

      const response = await supertest(app)
        .post('/simulations')
        .send({ customerId: 1, vehicleId: 1 })
      expect(response.status).toBe(200)
      expect(response.body.key).toBe('abc123')
      expect(response.body.accessKey).toBe('xyz789')
    })

    it('Should handle error when creating a simulation with missing data', async () => {
      const response = await supertest(app).post('/simulations').send({})

      expect(response.status).toBe(400)
      expect(response.body.error).toBe(
        'Necessário informar todos os dados para a simulação!',
      )
    })

    it('Should handle error when creating a simulation with invalid data', async () => {
      vitest
        .spyOn(simulationService, 'createSimulation')
        .mockRejectedValueOnce(new Error('Erro simulado'))

      const response = await supertest(app)
        .post('/simulations')
        .send({ customerId: 1, vehicleId: 1 })
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Falha ao criar simulação')
    })
  })
})
