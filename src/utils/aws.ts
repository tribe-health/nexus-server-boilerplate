import aws from 'aws-sdk'
import * as dotenv from 'dotenv'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()

const S3_BUCKET = process.env.AWS_S3_BUCKET as string

interface FileUploadBase {
  createReadStream: any
  contentType?: string
  contentEncoding?: string
  acl?: string
}

interface ImageUpload extends FileUploadBase {
  filename: string
  subPath?: string
}

interface FileUpload extends FileUploadBase {
  key: string
}

interface KeyPayload {
  filename: string
  rootPath?: string
  subPath?: string
}

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_BUCKET_REGION,
})

const s3 = new aws.S3({ apiVersion: process.env.AWS_S3_API_VERSION })

/**
 * Returns a unique path
 * @returns {string} A path with the format: rootPath? subPath? uniqueIdentifier extname
 */
const generateKey = (payload: KeyPayload): string => {
  return `${payload.rootPath}${payload.subPath}${uuidv4()}${path.extname(
    payload.filename,
  )}`
}

/**
 * Returns uploaded file location
 */
const uploadFile = async (file: FileUpload): Promise<string> => {
  const { createReadStream, key, contentType, contentEncoding, acl } = file

  const { Location } = await s3
    .upload({
      Body: createReadStream(),
      Key: key,
      Bucket: S3_BUCKET,
      ACL: acl || 'public-read',
      ContentType: contentType,
      ContentEncoding: contentEncoding,
    })
    .promise()

  return Location
}

/**
 * Returns uploaded image location
 */
export const uploadImage = async (image: ImageUpload): Promise<string> => {
  const { filename, subPath, ...rest } = image

  const key = generateKey({
    filename,
    rootPath: process.env.AWS_S3_IMAGES_PATH,
    subPath,
  })

  return await uploadFile({ ...rest, key })
}
