import userService from '../../services/user.service'

export async function seed(): Promise<void> {
  const rootUser = await userService.getUserByUsername('root')

  if (!rootUser) {
    await userService.createUser({
      username: 'root',
      password: 'S3CUR3_P455W0RD',
    })
  }
}
