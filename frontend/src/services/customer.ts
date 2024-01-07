import { Vehicle } from "models/vehicle.model"
import baseAPI from "./api"

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

export { getAvailableVehicles }
