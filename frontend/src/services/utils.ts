export const getUrlBase = () => {
  const { protocol, hostname, port } = window.location
  const portPart = port ? `:${port}` : ""
  return `${protocol}//${hostname}${portPart}`
}

export const urlOnRoute = (route = "") => {
  return `${getUrlBase()}/${route}`
}

export const waitTimeInSeconds = (time = 1) =>
  new Promise((resolve) => setTimeout(resolve, 1000 * time))
