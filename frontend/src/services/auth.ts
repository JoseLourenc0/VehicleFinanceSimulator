import baseApi from "./api"

const login: (
  user: string,
  password: string
) => Promise<{ token: string | null }> = async (user, password) => {
  try {
    const { data } = await baseApi.post("/sign-in", { user, password })
    return { token: data.token }
  } catch (error) {
    return {
      token: null,
    }
  }
}

export const authRequest = {
  login,
}
