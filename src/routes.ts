import { Router } from 'express'

import uploader from '@app/middlewares/upload'
import sendToGCS from '@app/middlewares/sendToGCS'
import verifyAuth from '@app/middlewares/verifyAuth'

import UserController from '@app/controllers/UserController'
import SessionController from '@app/controllers/SessionController'
import PostController from '@app/controllers/PostController'

const router = Router()

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