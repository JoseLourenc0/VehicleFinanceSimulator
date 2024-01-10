import { Customer } from "@models/customer.model"
import baseAPI from "./api"
import { Simulation } from "@models/Simulation.model"
import { Vehicle } from "@models/vehicle.model"

export const getCustomers = async () => {
  try {
    const { data } = await baseAPI.get<{ customers: Customer[] }>("/customers")
    return { data: data.customers }
  } catch (error) {
    return { error }
  }
}

export const getVehicles = async () => {
  try {
    const { data } = await baseAPI.get<{ vehicles: Vehicle[] }>("/vehicles")
    return { data: data.vehicles }
  } catch (error) {
    return { error }
  }
}

export const getSimulations = async () => {
  try {
    const { data } = await baseAPI.get<{ simulations: Simulation[] }>(
      "/simulations"
    )
    return { data: data.simulations }
  } catch (error) {
    return { error }
  }
}
