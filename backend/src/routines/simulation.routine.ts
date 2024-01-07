/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Knex } from 'knex'
import { knex } from '../database'
import simulationService from '../services/simulation.service'
import { log } from '../utils'

class SimulationRoutine {
  private knex: Knex

  constructor(knex: Knex) {
    this.knex = knex
  }

  async runRoutine() {
    try {
      const unprocessedSimulations = await this.knex('simulations')
        .where({ processed: false })
        .whereNull('deleted_at')

      for (const simulation of unprocessedSimulations) {
        const randomScore = Math.floor(Math.random() * 999) + 1

        await simulationService.updateSimulation(simulation.id, {
          score: randomScore,
          processed: true,
        })
      }

      log(
        `Rotina executada com sucesso. Registros atualizados: ${unprocessedSimulations.length}`,
      )
    } catch (error) {
      log(['Erro ao executar a rotina:', (error as Error).message], 'error')
    }
  }
}

export default new SimulationRoutine(knex)
