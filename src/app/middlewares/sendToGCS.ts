import { Request, Response, NextFunction as Next } from 'express'
import { Storage } from '@google-cloud/storage'
import path from 'path'

import storageConfig, { BUCKET } from '@config/gcs'

const storage = new Storage(storageConfig)
const bucket = storage.bucket(BUCKET)

export default function sendToGCS (req: Request, res: Response, next: Next) {
  if (!req.file) {
    next()
  } else {
    const originalname = req.file.originalname
    const ext = path.extname(originalname)
    const basename = path.basename(originalname, ext).replace(' ', '_')
    const filename = `${basename}-${Date.now()}${ext}`
    const file = bucket.file(filename)
    const fileStream = file.createWriteStream({
      resumable: false,
      public: true
    })
  
    fileStream.on('error', error => {
      console.log(error)
      return res.status(400).json({ error: 'Unable to upload the avatar.' })
    })
  
    fileStream.on('finish', () => {
      req.file.filename = filename
      next()
    })
  
    fileStream.end(req.file.buffer)
  }
}

