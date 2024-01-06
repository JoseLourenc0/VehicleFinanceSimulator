import { NextFunction, Request, Response } from 'express'
import userService from '../services/user.service'
import { log } from '../utils'
import jwtService from '../services/jwt.service'
import { UserRequest } from '../models/utils.model'
import { User } from '../models/user.model'

export const signInRoute = async (req: Request, res: Response) => {
  try {
    const { user, password } = req.body
    if (!user || !password)
      throw new Error('Necessário informar usuário e senha')

    const token = await userService.authenticateUser(user, password)
    return res.send({ token })
  } catch (error) {
    log(error, 'error')
    return res.sendStatus(401)
  }
}

export const authMiddleware = (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split('Bearer ')[1]

    if (!token) throw new Error('Invalid token')
    const decode = jwtService.verify(token)

    req.user = decode as User
    next()
  } catch (error) {
    log(error, 'error')
    res.sendStatus(403)
  }
}
