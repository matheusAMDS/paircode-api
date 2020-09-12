import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import bcrypt from 'bcryptjs'

import { generateAccessToken } from '@app/lib/auth'
import UserRepository from '@app/repositories/UserRepository'

class SessionController {
  public async store(req: Request, res: Response) {
    const { email, password } = req.body
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOneWithPassword({ email })

    if (!user)
      return res.status(400).json({ error: "Email not registered." })

    if (!await bcrypt.compare(password, user.passwordHash))
      return res.status(400).json({ error: "Wrong password." })

    const token = generateAccessToken(user.id)

    return res.json({
      token,
      user: {
        ...user,
        id: undefined,
        passwordHash: undefined
      }
    })
  }
}

export default new SessionController()