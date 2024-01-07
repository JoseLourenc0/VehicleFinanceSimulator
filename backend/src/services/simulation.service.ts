import bcrypt from 'bcrypt'
import { Knex } from 'knex'
import { knex } from '../database'
import { Simulation } from '../models/simulation.model'
import { SimulationException } from '../utils'

class SimulationService {
  private knex: Knex

  private saltRounds: number

  constructor(knex: Knex) {
    this.knex = knex
    this.saltRounds = 5
  }

  private async hashAccessKey(accessKey: string): Promise<string> {
    return bcrypt.hash(accessKey, this.saltRounds)
  }

  private async compareAccessKey(
    plainAccessKey: string,
    hashedAccessKey: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainAccessKey, hashedAccessKey)
  }

  async getAllSimulations(): Promise<Simulation[]> {
    return this.knex('simulations').select('*').whereNull('deleted_at')
  }

  async getSimulationById(id: number): Promise<Simulation | undefined> {
    return this.knex('simulations')
      .where({ id })
      .whereNull('deleted_at')
      .first()
  }

  async getSimulationByKey(key: string, accessKey: string) {
    if (!key || !accessKey)
      throw new SimulationException('Necessário informar dados corretamente')

    const data = await this.knex('simulations')
      .where({ key })
      .whereNull('deleted_at')
      .first()
    if (!data) throw new SimulationException('Não foi encontrada Simulação')

    const compare = await this.compareAccessKey(accessKey, data.access_key)
    if (!compare)
      throw new SimulationException('Simulação não pode ser acessada')

    return data
  }

  async createSimulation(
    simulationData: Omit<
      Simulation,
      'id' | 'created_at' | 'updated_at' | 'deleted_at'
    >,
  ): Promise<number> {
    // Verifica se userId ou customerId está presente
    if (!simulationData.customer_id) {
      throw new SimulationException('CustomerId is required.')
    }

    if (!simulationData.vehicle_id) {
      throw new SimulationException('VehicleId is required.')
    }

    const hash = await this.hashAccessKey(simulationData.access_key)

    const [id] = await this.knex('simulations').insert(
      { ...simulationData, access_key: hash },
      'id',
    )

    return id as number
  }

  async updateSimulation(
    id: number,
    simulationData: Omit<
      Simulation,
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
