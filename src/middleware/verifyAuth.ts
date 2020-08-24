import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction as Next } from 'express'

import { SECRET } from 'config/auth'

interface Decoded {
  id: number;
  sub: string;
  exp: number;
  iat: number;
}

const verifyAuth = (req: Request, res: Response, next: Next) => {
  const { authorization } = req.headers

  if (!authorization)
    return res.status(401).json({ 
      error: 'Authorization header not provided.' 
    })

  const [ schema, token ] = authorization.split(' ')

  if (typeof schema !== 'string' || typeof token !== 'string')
    return res.status(401).json({ error: 'Malformed authorization header.' })

  if (schema !== 'Bearer')
    return res.status(401).json({ error: "Token schema must be 'Bearer'." })

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ error: err.message })

    const { id } = decoded as Decoded

    req.userId = id
    next()
  })
}

export default verifyAuth