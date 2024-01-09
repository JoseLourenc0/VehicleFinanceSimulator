import { Vehicle } from "@models/vehicle.model"
import baseAPI from "./api"
import { Customer } from "@models/customer.model"
import { Simulation } from "@models/Simulation.model"

const getAvailableVehicles = async () => {
  try {
    const { data } = await baseAPI.get<{ vehicles: Vehicle[] }>("/vehicles")
    return { data }
  } catch (error) {
    return {
      error,
    }
  }
}

const getCustomerByCPF = async (cpf: string) => {
  try {
    const { data } = await baseAPI.get<Customer>(`/customers/cpf/${cpf}`)
    return { data }
  } catch (error) {
    return {
      error,
    }
  }
}

const regCustomer = async (customer: {
  cpf: string
  name: string
  email: string
  phone: string
}) => {
  try {
    const { data } = await baseAPI.post<{ customer: number }>("/customers", {
      ...customer,
    })
    return { data }
  } catch (error) {
    return {
      error,
    }
  }
}

const regSimulation = async (payload: {
  customerId: number
  vehicleId: number
}) => {
  try {
    const { data } = await baseAPI.post<{ key: string; accessKey: string }>(
      "/simulations",
      {
        ...payload,
      }
    )
    return { data }
  } catch (error) {
    return {
      error,
    }
  }
}

const getSimulationByKey = async (key: string, accessKey: string) => {
  try {
    const { data } = await baseAPI.get<Simulation>(
      `/simulations/${key}/${accessKey}`
    )
    return { data }
  } catch (error) {
    return {
      error,
    }
  }
}

export {
  getAvailableVehicles,
  getCustomerByCPF,
  regCustomer,
  regSimulation,
  getSimulationByKey,
}
