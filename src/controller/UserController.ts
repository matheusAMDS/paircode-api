import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import bcrypt from 'bcryptjs'

import { UserRepository } from 'repository/UserRepository'

class UserController {
  public async index(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository)
    const users = await userRepository.find()

    return res.json({ users })
  }

  public async store(req: Request, res: Response) {
    const { firstName, lastName, email, password, discord } = req.body
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({ email })

    if (user)
      return res.status(401).json({ error: "Email already registered." })

    await userRepository.insert({
      firstName,
      lastName,
      email,
      discord,
      passwordHash: await bcrypt.hash(password, 10),
    })

    return res.status(201).end()
  }

  public async update(req: Request, res: Response) {
    const id = req.userId as number
    const bio = req.body.bio as string
    const filename = req.file && req.file.filename
    const userRepository = getCustomRepository(UserRepository)
    
    await userRepository.update({ id }, {
      bio,
      avatar: filename
    })

    return res.status(201).end()
  }
}

export default new UserController()