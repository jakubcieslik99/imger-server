import { Application } from 'express'
import { Sequelize } from 'sequelize'
import { log } from './utilities'

const db = new Sequelize('app', '', '', {
  storage: './database.sqlite',
  dialect: 'sqlite',
  logging: false,
})

const databaseConnect = async (app: Application) => {
  try {
    await db.sync()

    log.info('SQLite connection established')
    app.emit('ready')
  } catch (error) {
    log.error(error)
  }
}

export { db, databaseConnect }
