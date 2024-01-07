import supertest from 'supertest'
import { describe, it, expect, vitest } from 'vitest'
import { randomUUID } from 'crypto'
import { app } from '../../src/http'
import vehicleService from '../../src/services/vehicle.service'
import { getToken, newVehicle } from '../testUtils'

describe('/vehicles', () => {
  describe('GET - /', () => {
    it('Should get all vehicles', async () => {
      const response = await supertest(app).get('/vehicles')
      expect(response.status).toBe(200)
      expect(response.body.vehicles).toBeDefined()
    })

    it('Should handle error when fetching all vehicles', async () => {
      vitest
        .spyOn(vehicleService, 'getAvailableVehicles')
        .mockRejectedValueOnce(new Error('Simulated error'))

      const response = await supertest(app).get('/vehicles')
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Falha ao buscar veículos')
    })
  })

  describe('GET - /:id', () => {
    it('Should get a vehicle by ID', async () => {
      const vehicle = await newVehicle()
      const response = await supertest(app).get(`/vehicles/${vehicle}`)
      expect(response.status).toBe(200)
      expect(response.body).toBeDefined()
    })

    it('Should handle error when fetching vehicle by ID', async () => {
      vitest
        .spyOn(vehicleService, 'getVehicleById')
        .mockRejectedValueOnce(new Error('Simulated error'))

      const response = await supertest(app).get('/vehicles/1')
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Falha ao buscar dados do veículo')
    })
  })

  describe('POST - /', () => {
    it('Should return forbidden when not authenticated', async () => {
      const response = await supertest(app)
        .post('/vehicles')
        .send({ brand: randomUUID(), color: randomUUID(), model: randomUUID() })

      expect(response.status).toBe(403)
    })

    it('Should create a new vehicle when authenticated', async () => {
      const token = await getToken()
      const response = await supertest(app)
        .post('/vehicles')
        .set('Authorization', token)
        .send({ brand: randomUUID(), color: randomUUID(), model: randomUUID() })

      expect(response.status).toBe(200)
      expect(response.body.vehicle).toBeDefined()
    })

    it('Should handle error when creating a vehicle with missing data', async () => {
      const token = await getToken()
      const response = await supertest(app)
        .post('/vehicles')
        .send({})
        .set('Authorization', token)

      expect(response.status).toBe(400)
      expect(response.body.error).toBe(
        'Necessário informar todos os dados do veículo!',
      )
    })
  })

  describe('DELETE - /:id', () => {
    it('Should return forbidden when not authenticated', async () => {
      const response = await supertest(app)
        .post('/vehicles')
        .send({ brand: randomUUID(), color: randomUUID(), model: randomUUID() })

      expect(response.status).toBe(403)
    })

    it('Should delete a vehicle by ID', async () => {
      const token = await getToken()
      const vehicle = await newVehicle()
      const response = await supertest(app)
        .delete(`/vehicles/${vehicle}`)
        .set('Authorization', token)

      expect(response.status).toBe(204)
    })

    it('Should handle error when deleting a vehicle by invalid ID', async () => {
      const token = await getToken()
      const response = await supertest(app)
        .delete('/vehicles/invalid_id')
        .set('Authorization', token)

      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Necessário informar id do veículo')
    })
  })
})
