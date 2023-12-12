import { Request, Response, NextFunction } from 'express'
import createError, { HttpError } from 'http-errors'
import { config, log } from '../config/utilities'

interface ErrorResAttributes {
  status: number
  message: string
  timestamp: Date
}

class ErrorRes implements ErrorResAttributes {
  constructor(public status: number, public message: string, public timestamp: Date) {}
}

const errorHandler = (controller: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(controller(req, res, next)).catch(next)

const notFound = (req: Request, _res: Response, next: NextFunction) => {
  if (req.path.split('/')[1] === 'static')
    return next(createError(404, 'Unable to find or not yet downloaded the requested image.'))
  return next(createError(404, 'Unable to find the requested resource.'))
}

const isError = (error: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  //no status error handling
  if (!error.status) {
    log.error(`INTERNAL - ${error.stack || error.message || 'Internal server error.'}`)
    return res.status(500).send(new ErrorRes(500, 'Internal server error.', new Date()))
  }
  //server error handling
  if (error.status >= 500) {
    log.error(`SERVER - ${error.status}: ${error.stack || error.message || 'Internal server error.'}`)
    return res.status(500).send(new ErrorRes(500, 'Internal server error.', new Date()))
  }
  //any other client error handling
  config.ENV !== 'production' && log.error(`CLIENT - ${error.status}: ${error.message || 'Unknown error.'}`)
  return res.status(error.status).send(new ErrorRes(error.status, error.message || 'Unknown error.', new Date()))
}

export { errorHandler, notFound, isError }
