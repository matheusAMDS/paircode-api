import { Router } from 'express'

import { uploader, sendToGCS } from '@app/lib/upload'
import { verifyAuth } from '@app/lib/auth'

import UserController from '@app/controllers/UserController'
import SessionController from '@app/controllers/SessionController'
import PostController from '@app/controllers/PostController'

const router = Router()

router.get('/', (req, res) => {
  return res.json({ message: 'Welcome to PairCode API!' })
})

router.post('/signin', SessionController.store)

router.post('/users', UserController.store)
router.get('/users/me', verifyAuth, UserController.show)
router.put(
  '/users/me', 
  verifyAuth, 
  uploader.single('avatar'),
  sendToGCS, 
  UserController.update
)

router.get('/posts', PostController.index)
router.post('/posts', verifyAuth, PostController.store)
router.delete('/posts/:id', verifyAuth, PostController.delete)

export default router