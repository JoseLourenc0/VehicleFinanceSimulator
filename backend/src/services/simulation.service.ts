/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import bcrypt from 'bcrypt'
import { Knex } from 'knex'
import { randomUUID } from 'crypto'
import { knex } from '../database'
import { Simulation } from '../models/simulation.model'
import { SimulationException } from '../utils'
import { Vehicle } from '../models/vehicle.model'
import { Customer } from '../models/customer.model'

class SimulationService {
  private knex: Knex

  private saltRounds: number

  public simulationPlans = [
    {
      min: 1,
      max: 300,
      title: 'Reprovado',
      text: 'Compreendemos que, no momento, a aprovação para o financiamento de carro não foi possível. Não se preocupe, estamos aqui para ajudar a orientá-lo em como melhorar sua situação de crédito. Juntos, podemos trabalhar para alcançar seus objetivos financeiros e tornar possível a realização do seu sonho automotivo.',
    },
    {
      min: 300,
      max: 600,
      title: '70% de entrada, 30% do comprometimento da renda',
      text: 'Parabéns! Seu esforço foi recompensado com uma oferta de financiamento de carro. Agora é o momento perfeito para fechar o acordo. Entre em contato conosco para discutir os detalhes e começar a dirigir o seu novo carro em breve!',
    },
    {
      min: 600,
      max: 800,
      title: '50% de entrada, 25% do comprometimento da renda',
      text: 'Excelente trabalho! Seu histórico de crédito abriu as portas para uma oferta vantajosa de financiamento de carro. Não deixe essa oportunidade escapar. Entre em contato conosco agora para finalizar o acordo e começar a desfrutar do seu novo veículo.',
    },
    {
      min: 800,
      max: 950,
      title: '30% de entrada, 20% do comprometimento da renda',
      text: 'Parabéns pela conquista! Seu notável score resultou em uma oferta ainda mais vantajosa para o financiamento do seu próximo carro. Não perca tempo, feche o acordo hoje mesmo. Entre em contato conosco para finalizar os detalhes e começar a dirigir com estilo.',
    },
    {
      min: 950,
      max: 1000,
      title: '100% de financiamento, taxa zero',
      text: 'Incrível! Seu excepcional score abriu as portas para uma oferta exclusiva. Aproveite esta oportunidade única e entre em contato conosco agora para fechar o acordo. Adquira o carro dos seus sonhos sem preocupações financeiras. Estamos ansiosos para recebê-lo na família de proprietários satisfeitos.',
    },
  ]

  constructor(knex: Knex) {
    this.knex = knex
    this.saltRounds = 2
  }

  private async hashAccessKey(accessKey: string): Promise<string> {
    return bcrypt.hash(accessKey, this.saltRounds)
  }

  private compareAccessKey(
    plainAccessKey: string,
    hashedAccessKey: string,
  ): boolean {
    return plainAccessKey === hashedAccessKey
    // return bcrypt.compare(plainAccessKey, hashedAccessKey)
  }

  getPlan(score: number) {
    return this.simulationPlans.find(
      (plan) => score >= plan.min && score < plan.max,
    )
  }

  async getAllSimulations(): Promise<Simulation[]> {
    return this.knex('simulations').select('*').whereNull('deleted_at')
  }

  getSimulationsGroupedBy(groupBy: 'customer_id' | 'vehicle_id') {
    return this.knex('simulations')
      .select(groupBy)
      .count('id as total_simulations')
      .groupBy(groupBy)
  }

  getVehiclesBySimulationIds(
    ids: number[],
  ): Promise<(Vehicle & { simulationId: number })[]> {
    return this.knex('vehicles')
      .join('simulations', 'vehicles.id', '=', 'simulations.vehicle_id')
      .whereIn('simulations.id', ids)
      .select('vehicles.*')
  }

  getCustomersBySimulationIds(
    ids: number[],
  ): Promise<(Customer & { simulationId: number })[]> {
    return this.knex('customers')
      .join('simulations', 'customers.id', '=', 'simulations.vehicle_id')
      .whereIn('simulations.id', ids)
      .select('customers.*')
  }

  async getSimulationById(id: number): Promise<Simulation | undefined> {
    return this.knex('simulations')
      .where({ id })
      .whereNull('deleted_at')
      .first()
  }

  async getSimulationByKey(key: string, accessKey: string, allFields = false) {
    if (!key || !accessKey)
      throw new SimulationException('Necessário informar dados corretamente')

    const data: Simulation = await this.knex('simulations')
      .where({ key })
      .whereNull('deleted_at')
      .first()
    if (!data) throw new SimulationException('Não foi encontrada Simulação')

    const compare = await this.compareAccessKey(accessKey, data.access_key)
    if (!compare)
      throw new SimulationException('Simulação não pode ser acessada')

    if (allFields) return data

    const { access_key: access_keyF, key: keyF, ...fData } = data

    return fData
  }

  async createSimulation(
    simulationData: Omit<
      Simulation,
      | 'id'
      | 'created_at'
      | 'updated_at'
      | 'deleted_at'
      | 'key'
      | 'access_key'
      | 'score'
      | 'processed'
    >,
  ): Promise<{ id: number; accessKey: string; key: string }> {
    // Verifica se userId ou customerId está presente
    if (!simulationData.customer_id) {
      throw new SimulationException('CustomerId is required.')
    }

    if (!simulationData.vehicle_id) {
      throw new SimulationException('VehicleId is required.')
    }

    const accessKey = randomUUID()
    const key = randomUUID()

    // !TODO hash passou a crashar nessa geração
    // const hash = await this.hashAccessKey(accessKey)

    const [id] = await this.knex('simulations').insert(
      { ...simulationData, access_key: accessKey, key },
      'id',
    )

    return { id, accessKey, key }
  }

  async updateSimulation(
    id: number,
    simulationData: Omit<
      Partial<Simulation>,
      'id' | 'created_at' | 'updated_at' | 'deleted_at'
    >,
  ): Promise<number> {
    return this.knex('simulations').where({ id }).update(simulationData)
  }

  async deleteSimulation(id: number): Promise<number> {
    return this.knex('simulations')
      .where({ id })
      .update({ deleted_at: this.knex.fn.now() })
  }
}

export default new SimulationService(knex)
