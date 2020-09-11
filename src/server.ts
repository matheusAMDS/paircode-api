import "dotenv/config"
import "reflect-metadata"
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import '@database/connection'
import { PORT } from '@config/app'
import routes from './routes'

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use('/api', routes)

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))