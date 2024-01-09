import { Customer } from "./customer.model"
import { Vehicle } from "./vehicle.model"

export interface Plan {
  min: number
  max: number
  title: string
  text: string
}

export interface Simulation {
  id: number
  score: number
  processed: number
  customer?: Customer
  vehicle?: Vehicle
  plan?: Plan
  createdAt: Date
  updatedAt: Date
}
