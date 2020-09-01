import { Router } from 'express'

import uploader from 'middleware/upload'
import verifyAuth from 'middleware/verifyAuth'

import UserController from 'controller/UserController'
import SessionController from 'controller/SessionController'
import PostController from 'controller/PostController'

const router = Router()

router.post('/signin', SessionController.store)

//router.get('/users', UserController.index)
router.post('/users', UserController.store)
router.get('/users/me', verifyAuth, UserController.show)
router.put('/users/me', verifyAuth, uploader.single('avatar'), UserController.update)

router.get('/posts', PostController.index)
router.post('/posts', verifyAuth, PostController.store)
router.delete('/posts/:id', verifyAuth, PostController.delete)

export default router