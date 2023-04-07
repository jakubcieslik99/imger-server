import { AxiosResponse } from 'axios'
import fs from 'fs'
import path from 'path'

const fileSave = (response: AxiosResponse, fileName: string) => {
  return new Promise<Date>((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(path.resolve(__dirname, '../../uploads', fileName)))
      .on('finish', () => {
        resolve(new Date())
      })
      .on('error', (err: any) => {
        reject(err)
      })
  })
}

export default fileSave
