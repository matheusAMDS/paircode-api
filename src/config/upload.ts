import multer, { Options } from 'multer'
import path from 'path'

export default {
  limit: 1 * 1024 * 1024,
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const permittedExts = [ '.png', '.jpg', '.jpeg' ]
    const ext = path.extname(file.originalname)

    cb(null, permittedExts.includes(ext))
  }
} as Options
