import { MEDIA_FOLDER, getCloudinary, isCloudinaryConfigured } from '../../../../lib/blog/cloudinary'
import { handleError, jsonError, readJson, requireAdmin } from '../../../../lib/blog/api'

const RESOURCE_TYPES = ['image', 'video', 'raw']

// POST /api/admin/upload  { resourceType: 'image' | 'video' | 'raw' }
// Returns a short-lived signature the editor uses to upload straight to Cloudinary, so
// large videos never pass through (or hit the body limits of) this server.
export async function POST(request) {
  const { error } = await requireAdmin(request)
  if (error) return error
  if (!isCloudinaryConfigured()) {
    return jsonError('Uploads need Cloudinary. Add the Cloudinary credentials to the environment and restart.', 503)
  }

  const body = await readJson(request)
  const resourceType = RESOURCE_TYPES.includes(body?.resourceType) ? body.resourceType : 'image'

  try {
    const cloudinary = getCloudinary()
    const params = {
      timestamp: Math.round(Date.now() / 1000),
      folder: `${MEDIA_FOLDER}/${resourceType === 'raw' ? 'files' : `${resourceType}s`}`,
      use_filename: true,
      unique_filename: true,
    }
    const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET)
    return Response.json({
      uploadUrl: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      apiKey: process.env.CLOUDINARY_API_KEY,
      signature,
      ...params,
    })
  } catch (err) {
    return handleError(err)
  }
}
