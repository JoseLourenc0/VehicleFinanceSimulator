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
    image:
      'https://hips.hearstapps.com/hmg-prod/images/2022-tesla-model-3-mmp-1-1640025520.jpg?crop=0.763xw:0.572xh;0.120xw,0.173xh&resize=1200:*',
  },
  {
    color: 'Prata Metálico',
    brand: 'Toyota',
    model: 'Camry Hybrid',
    image:
      'https://cdn.motor1.com/images/mgl/JOOVpJ/s1/toyota-camry-hybrid-2023.webp',
  },
  {
    color: 'Azul Navarra Metálico',
    brand: 'Audi',
    model: 'Q5',
    image:
      'https://www.carscoops.com/wp-content/uploads/2016/10/audi-q5-neckarsulm-navarra-blue-11.jpg',
  },
  {
    color: 'Branco',
    brand: 'Fiat',
    model: 'Uno',
    image:
      'https://vipmultimarcas.com/arquivo/1/veiculo/757/ccc3477792904d3a9469141bb20c4758_1690470764770.jpg',
  },
  {
    color: 'Cinza Metálico',
    brand: 'Nissan',
    model: 'Rogue',
    image:
      'https://vehiclephotos.b-cdn.net/photos/vehicles/262640/6028135-large.jpg',
  },
  {
    color: 'Branco',
    brand: 'BMW',
    model: 'X5',
    image:
      'https://cdn.jdpower.com/JDPA_2020%20BMW%20X5%20Mineral%20White%20Front%20Quarter%20View.jpg',
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
        image: vehicle.image,
      })
  }
}
