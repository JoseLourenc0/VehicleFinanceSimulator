export interface Customer {
  id: number
  name: string
  email: string
  cpf: string
  phone: string
  simulations?: number
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}
