import dotenv from 'dotenv'
import logger from 'pino'

dotenv.config()

const config = {
  ENV: process.env.ENV || 'dev',
  /*-------------------------------------------------------------------------------------*/
  PORT: process.env.PORT || 3001,
  API_URL: process.env.API_URL || 'http://localhost:3001',
  /*-------------------------------------------------------------------------------------*/
  CONCURRENT_DOWNLOADS: process.env.CONCURRENT_DOWNLOADS || 5,
  ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff', 'ico'],
}

const log = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:yyyy/mm/dd HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
})

export { config, log }
