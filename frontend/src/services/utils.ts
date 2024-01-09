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

export const validateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]/g, "")

  if (cpf.length !== 11) {
    return false
  }

  if (/^(\d)\1+$/.test(cpf)) {
    return false
  }

  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let resto = 11 - (soma % 11)
  const digito1 = resto === 10 || resto === 11 ? 0 : resto

  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  resto = 11 - (soma % 11)
  const digito2 = resto === 10 || resto === 11 ? 0 : resto

  return (
    parseInt(cpf.charAt(9)) === digito1 && parseInt(cpf.charAt(10)) === digito2
  )
}

export const validatePhoneNumber = (phoneNumber: string) => {
  phoneNumber = phoneNumber.replace(/[^\d]/g, "")

  const validFormat = /^[1-9]{2}(9?\d{8}|[2-9]\d{7})$/.test(phoneNumber)

  return validFormat
}

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
