import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import bcrypt from 'bcryptjs'

import QueueManager from '@app/lib/queue'
import { UserRepository } from '@app/repositories/UserRepository'

class UserController {
  public async show(req: Request, res: Response) {
    const userId = req.userId as number
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne({ id: userId }, {
      relations: [ 'posts', 'posts.user' ]
    })
    
    if (!user)
      return res.status(400).json({ error: 'No user with the passed id.' })

    return res.json({ user })
  }

  public async store(req: Request, res: Response) {
    const { firstName, lastName, email, password, whatsapp } = req.body
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({ email })

    if (user)
      return res.status(401).json({ error: "Email already registered." })

    await userRepository.insert({
      firstName,
      lastName,
      email,
      whatsapp,
      passwordHash: await bcrypt.hash(password, 10),
    })

    await QueueManager.add('RegistrationMail', {
      name: `${firstName} ${lastName}`,
      email
    })

    return res.status(201).end()
  }

  public async update(req: Request, res: Response) {
    const id = req.userId as number
    const bio = req.body.bio
    const filename = req.file && req.file.filename
    const userRepository = getCustomRepository(UserRepository)
    
    await userRepository.update({ id }, {
      bio,
      avatar: filename || undefined
    })

    return res.status(201).end()
  }
}

export default new UserController()