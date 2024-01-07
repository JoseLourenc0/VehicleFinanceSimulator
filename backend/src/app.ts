import cron from 'node-cron'
import simulationRoutine from './routines/simulation.routine'

cron.schedule('*/2 * * * *', async () => {
  await simulationRoutine.runRoutine()
})
