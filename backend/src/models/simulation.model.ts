import { Customer } from './customer.model'
import { Vehicle } from './vehicle.model'

export interface Simulation {
  id: number
  customer_id: number
  customer?: Customer
  vehicle_id: number
  vehicle?: Vehicle
  score: number | null
  processed: boolean
  key: string
  access_key: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}
