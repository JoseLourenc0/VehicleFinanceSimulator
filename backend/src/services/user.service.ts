import bcrypt from 'bcrypt'
import { Knex } from 'knex'
import { knex } from '../database'
import { UserException } from '../utils'
import { User } from '../models/user.model'
import jwtService from './jwt.service'

class UserService {
  private knex: Knex
  private saltRounds: number

  constructor(knex: Knex) {
    this.knex = knex
    this.saltRounds = 8
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds)
  }

  private async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
  }

  async authenticateUser(username: string, password: string): Promise<string> {
    const user = await this.knex('users')
      .where({ username })
      .whereNull('deleted_at')
      .first()
    
      
    if (user && user.password) {
      const authenticated = this.comparePasswords(password, user.password)
      if (!authenticated) throw new Error('Usuário ou senha incorretos')
      
      const token = jwtService.sign(user)
      return token
    }

    throw new UserException('Usuário inválido ou inativo')
  }

  async getAllUsers(): Promise<User[]> {
    return this.knex('users')
      .select('*')
      .whereNull('deleted_at')
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.knex('users')
      .where({ id })
      .whereNull('deleted_at')
      .first()
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.knex('users')
      .where({ username })
      .whereNull('deleted_at')
      .first()
  }

  async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>): Promise<number> {
    const hashedPassword = await this.hashPassword(userData.password)

    const [id] = await this.knex('users').insert({
      ...userData,
      password: hashedPassword,
    }, 'id')

    return id as number
  }

  async updateUser(id: number, userData: Omit<Partial<User>, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>): Promise<number> {
    return this.knex('users')
      .where({ id })
      .update(userData)
  }

  async deleteUser(id: number): Promise<number> {
    return this.knex('users')
      .where({ id })
      .update({ deleted_at: this.knex.fn.now() })
  }
}

export default new UserService(knex)
