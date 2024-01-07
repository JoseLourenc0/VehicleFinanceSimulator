/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Vehicle } from '../../models/vehicle.model'
import vehicleService from '../../services/vehicle.service'

const vehiclesList: Omit<
  Vehicle,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>[] = [
  {
    color: 'Azul Elétrico',
    brand: 'Tesla',
    model: 'Model 3',
  },
  {
    color: 'Prata Metálico',
    brand: 'Toyota',
    model: 'Camry Hybrid',
  },
  {
    color: 'Azul Navarra Metálico',
    brand: 'Audi',
    model: 'Q5',
  },
  {
    color: 'Cinza Metálico',
    brand: 'Nissan',
    model: 'Rogue',
  },
]

export async function seed(): Promise<void> {
  const availableVehicles = await vehicleService.getAvailableVehicles()
  for (const vehicle of vehiclesList) {
    const vehicleInDB = availableVehicles.find(
      (v) =>
        v.brand === vehicle.brand &&
        v.model === vehicle.model &&
        v.color === vehicle.color,
    )
    if (!vehicleInDB)
      await vehicleService.createVehicle({
        brand: vehicle.brand,
        color: vehicle.color,
        model: vehicle.model,
      })
  }
}
