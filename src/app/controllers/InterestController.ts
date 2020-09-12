import { Request, Response } from 'express'
import { getRepository, getCustomRepository } from 'typeorm'

import Interest from '@app/models/Interest'
import Post from '@app/models/Post'
import UserRepository from '@app/repositories/UserRepository'

class InterestController {
  public async store(req: Request, res: Response) {
    const userId = req.userId as number
    const postId = Number(req.params.id)
    const interestRepository = getRepository(Interest)
    const userRepository = getCustomRepository(UserRepository)
    const postRepository = getRepository(Post)
    
    const user = await userRepository.findOne({ id: userId })
    const post = await postRepository.findOne({ id: postId })

    if (!post)
      return res.status(404).json({ error: 'Post not found.' })
    
    await interestRepository.insert({
      user,
      post 
    })

    return res.status(201).end()
  }
}

export default new InterestController()