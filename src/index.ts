import "dotenv/config"
import "reflect-metadata"
import { createConnection } from "typeorm"
import express from 'express'
import path from 'path'
import cors from 'cors'

import { PORT } from 'config/app'
import routes from 'routes'

createConnection().then(async _ => {
	const app = express()

	app.use(cors())
	app.use(express.json())
	app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
	app.use('/api', routes)

	app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
}).catch(error => console.log(error))
