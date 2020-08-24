import multer from 'multer'
import path from 'path'

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      const { originalname } = file
      const ext = path.extname(originalname)
      const filename = path.basename(originalname, ext)

      cb(null, `${filename}-${Date.now()}${ext}`)
    }
  })
}