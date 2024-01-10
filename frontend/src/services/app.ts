import { Customer } from "@models/customer.model"
import baseAPI from "./api"

export const getCustomers = async () => {
  try {
    const { data } = await baseAPI.get<{ customers: Customer[] }>("/customers")
    return { data: data.customers }
  } catch (error) {
    return { error }
  }
}
