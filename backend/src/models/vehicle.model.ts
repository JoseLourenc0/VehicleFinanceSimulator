export interface Vehicle {
  id: number
  model: string
  brand: string
  color: string
  image?: string
  simulations?: number
  created_at: Date
  updated_at: Date
  deleted_at?: Date | null
}
