import { Knex } from 'knex'
import { knex } from '../database'
import { Customer } from '../models/customer.model'

class CustomerService {
  private knex: Knex

  constructor(knex: Knex) {
    this.knex = knex
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.knex('customers').select('*').whereNull('deleted_at')
  }

  async getCustomerById(id: number): Promise<Customer | undefined> {
    return this.knex('customers').where({ id }).whereNull('deleted_at').first()
  }

  async createCustomer(
    customerData: Omit<
      Customer,
      'id' | 'created_at' | 'updated_at' | 'deleted_at'
    >,
  ): Promise<number> {
    const [id] = await this.knex('customers').insert(customerData, 'id')

    return id as number
  }

  async updateCustomer(
    id: number,
    customerData: Omit<
      Partial<Customer>,
      'id' | 'created_at' | 'updated_at' | 'deleted_at'
    >,
  ): Promise<number> {
    return this.knex('customers').where({ id }).update(customerData)
  }

  async deleteCustomer(id: number): Promise<number> {
    return this.knex('customers')
      .where({ id })
      .update({ deleted_at: this.knex.fn.now() })
  }
}

export default new CustomerService(knex)
