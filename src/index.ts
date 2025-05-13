import express, { ErrorRequestHandler } from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import { config, log } from './config/utilities.js'
import { databaseConnect } from './config/databaseConnect.js'
import { notFound, isError } from './middlewares/errorMiddleware.js'
import imagesRoute from './routes/imagesRoute.js'

const app = express()
databaseConnect(app)

app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(cors())

//static files
app.use('/static/', express.static('uploads'))
//routes
app.use('/images', imagesRoute)
//404 error
app.all('/{*splat}', notFound)
//errors handling
app.use(isError as ErrorRequestHandler)

app.on('ready', () => {
  app.listen(config.PORT, () => log.info(`Server started on port ${config.PORT}`))
})
