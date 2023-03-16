import { Router } from 'express'
import { errorHandler } from '../middlewares/errorMiddleware'
import { getImagesData, getImageData, addImageToDownloads } from '../controllers/imagesController'

const router = Router()

router
  .get('/getImagesData', errorHandler(getImagesData))
  .get('/getImageData/:id', errorHandler(getImageData))
  .post('/addImageToDownloads', errorHandler(addImageToDownloads))

export default router
