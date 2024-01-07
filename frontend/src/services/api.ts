import axios from "axios"

const apiURL = import.meta.env.PROD
  ? "undefinedUrlUntilNow"
  : "http://localhost:3000"

const baseAPI = axios.create({
  baseURL: apiURL,
  timeout: 30000,
})

export default baseAPI
