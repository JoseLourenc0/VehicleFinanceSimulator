/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import bcrypt from 'bcrypt'
import { Knex } from 'knex'
import { randomUUID } from 'crypto'
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

    const hash = await this.hashAccessKey(accessKey)

    const [id] = await this.knex('simulations').insert(
      { ...simulationData, access_key: hash, key },
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
