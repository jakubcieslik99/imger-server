import async from 'async'
import axios from 'axios'
import fileSave from './fileSave'
import Image from '../models/Image'
import { config, log } from '../config/utilities'

type task = {
  generatedId: string
  sourceUrl: string
  sourceExtension: string
  storedUrl: string
  addedDate: Date
}

const downloadQueue = async.queue(async (task: task, callback) => {
  try {
    const { generatedId, sourceUrl, sourceExtension, storedUrl, addedDate } = task

    const response = await axios.get(sourceUrl, { responseType: 'stream' })
    const downloadedDate = await fileSave(response, `${generatedId}.${sourceExtension}`)

    await Image.create({ id: generatedId, sourceUrl, storedUrl, addedDate, downloadedDate })

    config.ENV !== 'prod' && log.info(`Image ${storedUrl} downloaded.`)
    callback()
  } catch (error) {
    log.error(error)
  }
}, +config.CONCURRENT_DOWNLOADS)

export default downloadQueue
