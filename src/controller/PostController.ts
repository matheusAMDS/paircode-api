import { getRepository, getCustomRepository } from 'typeorm'
import { Request, Response } from 'express'

import { Post } from '../entity/Post'
import { UserRepository } from '../repository/UserRepository'

import { BASE_API_URL } from '../config/app'

class PostController {
  public async index(req: Request, res: Response) {
    const userId = req.query.userId
    const postRepository = getRepository(Post)
    
    const posts = await postRepository.find({
      relations: [ 'user' ],
      where: userId && {
        user: {
          id: Number(userId)
        }
      }
    })
    const serializedPosts = posts.map(post => ({
      ...post,
      user: {
        ...post.user,
        avatar: post.user.avatar && `${BASE_API_URL}/uploads/${post.user.avatar}`
      }
    }))

    return res.json({ posts: serializedPosts })
  }

  public async store(req: Request, res: Response) {
    const userId = req.userId as number
    const { subject } = req.body
    const userRepository = getCustomRepository(UserRepository)
    const postRepository = getRepository(Post)
    
    const user = await userRepository.findOne({ id: userId })
    const post = postRepository.create({
      subject,
      user 
    })

    await postRepository.save(post)

    return res.status(201).end()
  }

  public async delete(req: Request, res: Response) {
    const userId = req.userId as number
    const id = Number(req.params.id)
    const postRepository = getRepository(Post)

    if (!id)
      return res.status(400).json({ error: "Missing post 'id'." })

    await postRepository.delete(id)

    return res.status(204).end()
  }
}

export default new PostController()