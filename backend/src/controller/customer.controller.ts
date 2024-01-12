/* eslint-disable no-param-reassign */
import { Request, Response } from 'express'
import customerService from '../services/customer.service'
import {
  RouteException,
  formatTimestamps,
  handleErrorMessages,
  log,
} from '../utils'
import simulationService from '../services/simulation.service'

const customerController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const customers = await customerService.getAllCustomers()
      const simulationsByUser =
        await simulationService.getSimulationsGroupedBy('customer_id')
      customers.forEach((customer) => {
        const simulations = simulationsByUser.find(
          (simulation) => simulation.customer_id === customer.id,
        )
        if (simulations) customer.simulations = simulations.total_simulations
      })
      const formatedCustomers = customers.map((vehicle) =>
        formatTimestamps(vehicle),
      )
      console.log({ simulationsByUser })
      res.send({
        customers: formatedCustomers,
      })
    } catch (error) {
      log(error, 'error')
      res.status(400).send({
        error: 'Falha ao buscar clientes',
      })
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const parsedId = Number(id)
      if (!id || !parsedId)
        throw new RouteException('Necessário informar id do cliente')

      const customer = await customerService.getCustomerById(parsedId)
      if (!customer) throw new RouteException('Cliente não encontrado')

      res.send(formatTimestamps(customer))
    } catch (error) {
      log(error, 'error')
      res.status(400).send({
        error: handleErrorMessages(error, 'Falha ao buscar dados do cliente'),
      })
    }
  },
  getByCPF: async (req: Request, res: Response) => {
    try {
      const { cpf } = req.params
      if (!cpf) throw new RouteException('Necessário informar cpf do cliente')

      const customer = await customerService.getCustomerByCPF(cpf)
      if (!customer) throw new RouteException('Cliente não encontrado')

      res.send(formatTimestamps(customer))
    } catch (error) {
      log(error, 'error')
      res.status(400).send({
        error: handleErrorMessages(error, 'Falha ao buscar dados do cliente'),
      })
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { name, email, cpf, phone } = req.body

      if (!name || !email || !cpf || !phone)
        throw new RouteException(
          'Necessário informar todos os dados do Cliente!',
        )

      const customer = await customerService.createCustomer({
        name,
        email,
        cpf,
        phone,
      })

      res.send({
        customer,
      })
    } catch (error) {
      log(error, 'error')
      res.status(400).send({
        error: handleErrorMessages(error, 'Falha ao deletar cliente'),
      })
    }
  },
  deleteById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const parsedId = Number(id)
      if (!id || !parsedId)
        throw new RouteException('Necessário informar id do cliente')

      const customer = await customerService.getCustomerById(parsedId)
      if (!customer) throw new RouteException('Cliente não encontrado')

      await customerService.deleteCustomer(parsedId)

      res.sendStatus(204)
    } catch (error) {
      log(error, 'error')
      res.status(400).send({
        error: handleErrorMessages(error, 'Falha ao deletar cliente'),
      })
    }
  },
}

export default customerController
