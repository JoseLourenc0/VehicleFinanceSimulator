import { describe, it, expect } from 'vitest'
import customerService from '../../src/services/customer.service'

describe('CustomerService', () => {
  it('should create a new customer', async () => {
    const newCustomerId = await customerService.createCustomer({
      name: 'test_customer',
      email: 'test_customer@example.com',
      cpf: '123.456.789-02',
      phone: '+55 11 98765-4321',
    })

    expect(newCustomerId).toBeDefined()
    expect(typeof newCustomerId).toBe('number')
  })

  it('should get all customers', async () => {
    const allCustomers = await customerService.getAllCustomers()

    expect(Array.isArray(allCustomers)).toBe(true)
  })

  it('should get a customer by ID', async () => {
    const newCustomer = await customerService.createCustomer({
      name: 'customer_to_get',
      email: 'customer_to_get@example.com',
      cpf: '987.654.321-01',
      phone: '+55 11 98765-4321',
    })

    const retrievedCustomer = await customerService.getCustomerById(newCustomer)

    expect(retrievedCustomer).toBeDefined()
    expect(retrievedCustomer?.id).toBe(newCustomer)
  })

  it('should update a customer', async () => {
    const newCustomer = await customerService.createCustomer({
      name: 'customer_to_update',
      email: 'customer_to_update@example.com',
      cpf: '987.654.321-02',
      phone: '+55 11 98765-4321',
    })

    const updateResult = await customerService.updateCustomer(newCustomer, {
      name: 'updated_customer_name',
    })

    expect(updateResult).toBe(1)
  })

  it('should delete a customer', async () => {
    const newCustomer = await customerService.createCustomer({
      name: 'customer_to_delete',
      email: 'customer_to_delete@example.com',
      cpf: '987.654.321-03',
      phone: '+55 11 98765-4321',
    })

    const deleteResult = await customerService.deleteCustomer(newCustomer)

    expect(deleteResult).toBe(1)
  })
})
