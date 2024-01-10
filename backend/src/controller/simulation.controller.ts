/* eslint-disable no-param-reassign */
import { Request, Response } from 'express'
import simulationService from '../services/simulation.service'
import {
  RouteException,
  formatTimestamps,
  handleErrorMessages,
  log,
} from '../utils'
import vehicleService from '../services/vehicle.service'
import customerService from '../services/customer.service'

const simulationController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const simulations = await simulationService.getAllSimulations()

      const idList = simulations.map((e) => e.id)

      const vehicles =
        await simulationService.getVehiclesBySimulationIds(idList)

      const customers =
        await simulationService.getCustomersBySimulationIds(idList)

      simulations.forEach((simulation) => {
        const vehicle = vehicles.find((e) => e.simulationId === simulation.id)
        delete vehicle?.simulationId
        simulation.vehicle = vehicle

        const customer = customers.find((e) => e.simulationId === simulation.id)
        delete customer?.simulationId
        simulation.customer = customer
      })

      const formatedSimulations = simulations.map((simulation) =>
        formatTimestamps(simulation),
      )

      res.send({
        simulations: formatedSimulations,
      })
    } catch (error) {
      log(error, 'error')
      res.status(400).send({
        error: 'Falha ao buscar Simulações',
      })
    }
  },
  getByAccessKey: async (req: Request, res: Response) => {
    try {
      const { accessKey, key } = req.params
      if (!accessKey || !key)
        throw new RouteException('Necessário informar dados da simulação')

      const simulation = await simulationService.getSimulationByKey(
        key,
        accessKey,
      )
      if (!simulation) throw new RouteException('Simulação não encontrada')

      const vehicle = await vehicleService.getVehicleById(simulation.vehicle_id)
      if (!vehicle)
        throw new RouteException('Veículo da simulação não encontrado')

      const customer = await customerService.getCustomerById(
        simulation.customer_id,
      )
      if (!customer)
        throw new RouteException('Cliente da simulação não encontrado')

      res.send(
        formatTimestamps({
          ...simulation,
          customer: formatTimestamps(customer),
          vehicle: formatTimestamps(vehicle),
          plan: simulationService.getPlan(simulation.score),
        }),
      )
    } catch (error) {
      log(error, 'error')
      res.status(400).send({
        error: handleErrorMessages(error, 'Falha ao buscar dados da simulação'),
      })
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { customerId, vehicleId } = req.body

      if (!customerId || !vehicleId)
        throw new RouteException(
          'Necessário informar todos os dados para a simulação!',
        )

      const { accessKey, key } = await simulationService.createSimulation({
        vehicle_id: vehicleId,
        customer_id: customerId,
      })

      res.send({
        key,
        accessKey,
      })
    } catch (error) {
      log(error, 'error')
      res.status(400).send({
        error: handleErrorMessages(error, 'Falha ao criar simulação'),
      })
    }
  },
}

export default simulationController
