import { Knex } from 'knex'
import { knex } from '../database'

interface Vehicle {
  id: number
  model: string
  brand: string
  color: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

class VehicleService {
  private knex: Knex

  constructor(knex: Knex) {
    this.knex = knex
  }

  private async getVehicles(all = false): Promise<Vehicle[]> {
    const qb = this.knex('vehicles').select('*')
    if (!all) qb.whereNull('deleted_at')
    return qb
  }

  async getAvailableVehicles(): Promise<Vehicle[]> {
    return this.getVehicles()
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    return this.getVehicles(true)
  }

  async getVehicleById(id: number): Promise<Vehicle | undefined> {
    return this.knex('vehicles').where({ id }).first()
  }

  async createVehicle(
    vehicleData: Omit<
      Vehicle,
      'id' | 'created_at' | 'updated_at' | 'deleted_at'
    >,
  ): Promise<number> {
    const [id] = await this.knex('vehicles').insert(vehicleData, 'id')
    return id as number
  }

  async updateVehicle(
    id: number,
    vehicleData: Omit<
      Partial<Vehicle>,
      'id' | 'created_at' | 'updated_at' | 'deleted_at'
    >,
  ): Promise<number> {
    return this.knex('vehicles').where({ id }).update(vehicleData)
  }

  async deleteVehicle(id: number): Promise<number> {
    return this.knex('vehicles')
      .where({ id })
      .update({ deleted_at: this.knex.fn.now() })
  }
}

export default new VehicleService(knex)
