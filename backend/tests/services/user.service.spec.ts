import { randomUUID } from "crypto"
import { describe, it, expect } from "vitest"
import userService from "../../src/services/user.service"

describe("UserService", () => {

  it("should create a new user", async () => {
    const newUserId = await userService.createUser({
      username: randomUUID(),
      password: "secure_password",
    })

    expect(newUserId).toBeDefined()
    expect(typeof newUserId).toBe("number")
  })

  it("should get all users", async () => {
    const allUsers = await userService.getAllUsers()

    expect(Array.isArray(allUsers)).toBe(true)
  })

  it("should get a user by ID", async () => {
    const newUser = await userService.createUser({
      username: randomUUID(),
      password: "secure_password",
    })

    const retrievedUser = await userService.getUserById(newUser)

    expect(retrievedUser).toBeDefined()
    expect(retrievedUser?.id).toBe(newUser)
  })

  it("should update a user", async () => {
    const userName = randomUUID()
    const newUser = await userService.createUser({
      username: userName,
      password: "secure_password",
    })

    const updateResult = await userService.updateUser(newUser, {
      username: userName + '_new',
    })

    expect(updateResult).toBe(1)
  })

  it("should delete a user", async () => {
    const newUser = await userService.createUser({
      username: randomUUID(),
      password: "secure_password",
    })

    const deleteResult = await userService.deleteUser(newUser)

    expect(deleteResult).toBe(1)
  })

  it("should authenticate a user with correct credentials", async () => {
    const userName = randomUUID()
    const newUser = await userService.createUser({
      username: userName,
      password: "secure_password",
    })

    const isAuthenticated = await userService.authenticateUser(
      userName,
      "secure_password"
    )

    expect(isAuthenticated).toBe(true)
  })

  it("should not authenticate a user with incorrect password", async () => {
    const userName = randomUUID()
    const newUser = await userService.createUser({
      username: userName,
      password: "secure_password",
    })

    const isAuthenticated = await userService.authenticateUser(
      userName,
      "wrong_password"
    )

    expect(isAuthenticated).toBe(false)
  })
})
