import { describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'
import simulationService from '../../src/services/simulation.service'
import { newCustomer, newVehicle } from '../testUtils'

describe('SimulationService', () => {
  it('should create a new simulation', async () => {
    const newSimulationId = await simulationService.createSimulation({
      customer_id: await newCustomer(),
      vehicle_id: await newVehicle(),
      score: null,
      processed: false,
      key: randomUUID(),
      access_key: randomUUID(),
    })

    expect(newSimulationId).toBeDefined()
    expect(typeof newSimulationId).toBe('number')
  })

  it('should throw an error if customer_id is missing', async () => {
    await expect(
      simulationService.createSimulation({
        vehicle_id: await newVehicle(),
        score: null,
        processed: false,
        key: randomUUID(),
        access_key: randomUUID(),
        customer_id: 0,
      }),
    ).rejects.toThrow('CustomerId is required.')
  })

  it('should throw an error if vehicle_id is missing', async () => {
    await expect(
      simulationService.createSimulation({
        customer_id: await newCustomer(),
        score: null,
        processed: false,
        key: randomUUID(),
        access_key: randomUUID(),
        vehicle_id: 0,
      }),
    ).rejects.toThrow('VehicleId is required.')
  })

  it('should get simulation by key and access key', async () => {
    await simulationService.createSimulation({
      customer_id: await newCustomer(),
      vehicle_id: await newVehicle(),
      score: null,
      processed: false,
      key: 'test_key',
      access_key: 'test_access_key',
    })

    const simulationData = await simulationService.getSimulationByKey(
      'test_key',
      'test_access_key',
    )

    expect(simulationData).toBeDefined()
    expect(simulationData.key).toBe('test_key')
    expect(simulationData.access_key.includes('$2b$')).toBe(true)
  })

  it('should throw an error if key or access key is missing', async () => {
    await expect(
      simulationService.getSimulationByKey('', 'test_access_key'),
    ).rejects.toThrow('Necessário informar dados corretamente')

    await expect(
      simulationService.getSimulationByKey('test_key', ''),
    ).rejects.toThrow('Necessário informar dados corretamente')
  })

  it('should throw an error if simulation is not found', async () => {
    await expect(
      simulationService.getSimulationByKey(
        'nonexistent_key',
        'test_access_key',
      ),
    ).rejects.toThrow('Não foi encontrada Simulação')
  })

  it('should throw an error if access key does not match', async () => {
    await simulationService.createSimulation({
      customer_id: await newCustomer(),
      vehicle_id: await newVehicle(),
      score: null,
      processed: false,
      key: 'test_key',
      access_key: 'test_access_key',
    })

    await expect(
      simulationService.getSimulationByKey('test_key', 'wrong_access_key'),
    ).rejects.toThrow('Simulação não pode ser acessada')
  })
})
