import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'

const {
    API_SECRET
} = process.env

class JwtService {

    private apiSecret:string

    constructor() {
        this.apiSecret = API_SECRET || 'AP1_S3Cr3T'
    }

    sign(user: User) {
        return jwt.sign({
            id: user.id,
            username: user.username,
        }, this.apiSecret, {
            expiresIn: 3600
        })
    }

    verify(token: string) {
        return jwt.verify(token, this.apiSecret)
    }

}

export default new JwtService()
