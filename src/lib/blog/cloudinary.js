import 'server-only'
import { v2 as cloudinary } from 'cloudinary'

// Everything the blog puts in Cloudinary lives under this folder: post data in /db,
// uploaded images, videos and files in /media.
export const ROOT_FOLDER = process.env.CLOUDINARY_FOLDER || 'krold-blog'
export const MEDIA_FOLDER = `${ROOT_FOLDER}/media`
export const DB_PUBLIC_ID = `${ROOT_FOLDER}/db/posts.json`

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET,
  )
}

let configured = false

export function getCloudinary() {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.',
    )
  }
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })
    configured = true
  }
  return cloudinary
}
