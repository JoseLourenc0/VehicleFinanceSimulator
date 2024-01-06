import { Request, Response } from 'express'
import userService from '../services/user.service'
import { log } from '../utils'

export const signInRoute = async (req: Request, res: Response) => {
    try {
        const { user, password } = req.body
        if (!user || !password) throw new Error('Necessário informar usuário e senha')

        const token = await userService.authenticateUser(user, password)
        return res.send({ token })
    } catch (error) {
        log(error, 'error')
        return res.sendStatus(401)
    }
}
