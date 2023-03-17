import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import { config, log } from './config/utilities'
import { databaseConnect } from './config/databaseConnect'
import { notFound, isError } from './middlewares/errorMiddleware'
import imagesRoute from './routes/imagesRoute'

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
app.all('*', notFound)
//errors handling
app.use(isError)

app.on('ready', () => {
  app.listen(config.PORT, () => log.info(`Server started on port ${config.PORT}`))
})
