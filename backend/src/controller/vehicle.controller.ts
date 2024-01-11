import { Request, Response } from 'express'
import {
  RouteException,
  formatTimestamps,
  handleErrorMessages,
  log,
} from '../utils'
import vehicleService from '../services/vehicle.service'

const vehicleController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const vehicles = await vehicleService.getAvailableVehicles()
      const formatedVehicles = vehicles.map((vehicle) =>
        formatTimestamps(vehicle),
      )
      res.send({
        vehicles: formatedVehicles,
      })
    } catch (error) {
      log(error, 'error')
      res.status(400).send({
        error: 'Falha ao buscar veículos',
      })
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const parsedId = Number(id)
      if (!id || !parsedId)
        throw new RouteException('Necessário informar id do veículo')

      const vehicle = await vehicleService.getVehicleById(parsedId)
      if (!vehicle) throw new RouteException('Veículo não encontrado')

      res.send(formatTimestamps(vehicle))
    } catch (error) {
      log(error, 'error')
      res.status(400).send({
        error: handleErrorMessages(error, 'Falha ao buscar dados do veículo'),
      })
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { brand, color, model, image } = req.body

      if (!brand || !color || !model)
        throw new RouteException(
          'Necessário informar todos os dados do veículo!',
        )

      const vehicle = await vehicleService.createVehicle({
        brand,
        color,
        model,
        image,
      })

      res.send({
        vehicle,
      })
    } catch (error) {
      log(error, 'error')
      res.status(400).send({
        error: handleErrorMessages(error, 'Falha ao deletar veículo'),
      })
    }
  },
  deleteById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const parsedId = Number(id)
      if (!id || !parsedId)
        throw new RouteException('Necessário informar id do veículo')

      const vehicle = await vehicleService.getVehicleById(parsedId)
      if (!vehicle) throw new RouteException('Veículo não encontrado')

      await vehicleService.deleteVehicle(parsedId)

      res.sendStatus(204)
    } catch (error) {
      log(error, 'error')
      res.status(400).send({
        error: handleErrorMessages(error, 'Falha ao deletar veículo'),
      })
    }
  },
}

export default vehicleController
