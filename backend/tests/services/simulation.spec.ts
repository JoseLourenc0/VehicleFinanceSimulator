import { describe, expect, it } from 'vitest'
import simulationService from '../../src/services/simulation.service'
import { newCustomer, newVehicle } from '../testUtils'

describe('SimulationService', () => {
  it('should create a new simulation', async () => {
    const { id, accessKey, key } = await simulationService.createSimulation({
      customer_id: await newCustomer(),
      vehicle_id: await newVehicle(),
    })

    expect(id).toBeDefined()
    expect(typeof id).toBe('number')
    expect(typeof accessKey).toBe('string')
    expect(typeof key).toBe('string')
  })

  it('should throw an error if customer_id is missing', async () => {
    await expect(
      simulationService.createSimulation({
        vehicle_id: await newVehicle(),
        customer_id: 0,
      }),
    ).rejects.toThrow('CustomerId is required.')
  })

  it('should throw an error if vehicle_id is missing', async () => {
    await expect(
      simulationService.createSimulation({
        customer_id: await newCustomer(),
        vehicle_id: 0,
      }),
    ).rejects.toThrow('VehicleId is required.')
  })

  it('should get simulation by key and access key', async () => {
    const { accessKey, key } = await simulationService.createSimulation({
      customer_id: await newCustomer(),
      vehicle_id: await newVehicle(),
    })

    const { id, processed, score } = await simulationService.getSimulationByKey(
      key,
      accessKey,
    )

    expect(id).toBeDefined()
    expect(typeof id).toBe('number')
    expect(processed).toBe(0)
    expect(score).toBeNull()
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
    const { accessKey, key } = await simulationService.createSimulation({
      customer_id: await newCustomer(),
      vehicle_id: await newVehicle(),
    })

    await expect(
      simulationService.getSimulationByKey(key, `wrong_${accessKey}`),
    ).rejects.toThrow('Simulação não pode ser acessada')
  })
})
