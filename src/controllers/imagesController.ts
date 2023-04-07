import { Request, Response } from 'express'
import createError from 'http-errors'
import { v4 as uuidv4 } from 'uuid'
import Image from '../models/Image'
import { config } from '../config/utilities'
import downloadQueue from '../functions/downloadQueue'

//GET - /images/getImagesData
const getImagesData = async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page as string) : 1
  if (isNaN(page)) throw createError(400, 'Page number must be a number.')
  if (page <= 0) throw createError(400, 'Page number must be greater than 0.')

  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10
  if (isNaN(limit)) throw createError(400, 'Limit must be a number.')
  if (limit <= 0) throw createError(400, 'Limit must be greater than 0.')

  const images = await Image.findAll({ limit, offset: (page - 1) * limit })

  return res.status(200).send(images)
}

//GET - /images/getImageData/:id
const getImageData = async (req: Request, res: Response) => {
  const image = await Image.findOne({ where: { id: req.params.id } })
  if (!image) throw createError(404, 'Image not found.')

  return res.status(200).send(image)
}

//POST - /images/addImageToDownloads
const addImageToDownloads = async (req: Request, res: Response) => {
  const { sourceUrl } = req.body
  if (!sourceUrl || typeof sourceUrl !== 'string') throw createError(400, 'URL with an image is required.')

  const sourceExtension = sourceUrl.split('.').pop()
  if (!sourceExtension) throw createError(400, 'URL with an image is required.')
  if (!config.ALLOWED_EXTENSIONS.includes(sourceExtension)) throw createError(400, 'Image extension is not allowed.')

  const generatedId = uuidv4()
  const storedUrl = `${config.API_URL}/static/${generatedId}.${sourceExtension}`
  const addedDate = new Date()

  downloadQueue.push({ generatedId, sourceUrl, sourceExtension, storedUrl, addedDate })

  return res.status(201).send({ storedUrl })
}

export { getImagesData, getImageData, addImageToDownloads }
