export interface Simulation {
  id: number
  customer_id: number
  vehicle_id: number
  score: number | null
  processed: boolean
  key: string
  access_key: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}
