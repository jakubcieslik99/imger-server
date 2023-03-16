import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import createError from 'http-errors'
import { config, log } from './config/utilities'
import { databaseConnect } from './config/databaseConnect'
import { isError } from './middlewares/errorMiddleware'
import imagesRoute from './routes/imagesRoute'

const app = express()
app.set('trust proxy', `loopback, ${config.IP}`)
databaseConnect(app)

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(helmet())
app.use(cors())

//static files
app.use('/static/', express.static('uploads'))
//routes
app.use('/images', imagesRoute)
//404 error
app.all('*', (_req, _res, next) => next(createError(404, 'Unable to find the requested resource.')))
//errors handling
app.use(isError)

app.on('ready', () => {
  app.listen(config.PORT, () => log.info(`Server started on port ${config.PORT}`))
})
