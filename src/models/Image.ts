import { Model, DataTypes } from 'sequelize'
import { db } from '../config/databaseConnect'

interface ImageAttributes {
  id: string
  sourceUrl: string
  storedUrl: string
  addedDate: Date
  downloadedDate: Date | null
}

export default class Image extends Model<ImageAttributes> {}

Image.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    sourceUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storedUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    downloadedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: 'images',
    timestamps: false,
  }
)
