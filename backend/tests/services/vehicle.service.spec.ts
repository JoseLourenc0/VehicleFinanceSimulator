import { describe, it, expect } from 'vitest'
import vehicleService from '../../src/services/vehicle.service'

describe('VehicleService', () => {
  it('Should create a new Vehicle', async () => {
    const newVehicle = await vehicleService.createVehicle({
      brand: 'NewBrand',
      color: 'NewColor',
      model: 'NewModel',
    })

    expect(newVehicle).toBeDefined()
    expect(typeof newVehicle).toBe('number')
  })
})
