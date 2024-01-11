/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios"

const apiURL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL
  : "http://localhost:3000"

const getHeaders = () => {
  const token = localStorage.getItem("user_token") || ""
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }
}

const baseAPI = axios.create({
  baseURL: apiURL,
  timeout: 30_000,
  headers: getHeaders(),
})

if (!import.meta.env.TEST) {
  baseAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("user_token")
    config.headers.Authorization = `Bearer ${token}`
    config.headers["Content-Type"] = "application/json"
    return config
  })

  baseAPI.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (
        error?.response?.status === 401 &&
        !error?.response?.request?.responseURL.includes("sign-in")
      ) {
        localStorage.clear()
        window.location.href = "/sign-in"
      } else {
        throw new AxiosError((error as any)?.response?.data?.message)
      }
    }
  )
}

export default baseAPI
