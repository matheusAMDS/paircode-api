import multer from 'multer'

import uploadConfig from 'config/upload'

const uploader = multer(uploadConfig)

export default uploader