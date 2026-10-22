// Uploads go from the browser straight to Cloudinary with a signature from
// /api/admin/upload, so big files never pass through this site's server.

export function resourceTypeFor(file) {
  if (file.type.startsWith('image/') && file.type !== 'image/svg+xml') return 'image'
  if (file.type.startsWith('video/') || file.type.startsWith('audio/')) return 'video'
  return 'raw'
}

// Cloudinary's free-plan limits; bigger files are refused there anyway, this just says so sooner.
const LIMITS = { image: 10, video: 100, raw: 10 }

export async function uploadFile(file, { resourceType = resourceTypeFor(file), onProgress } = {}) {
  const limit = LIMITS[resourceType]
  if (file.size > limit * 1024 * 1024) {
    throw new Error(`${file.name} is larger than ${limit} MB, the most Cloudinary accepts for this kind of file.`)
  }

  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resourceType }),
  })
  const sig = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(sig.error || 'Could not start the upload.')

  const form = new FormData()
  form.append('file', file)
  form.append('api_key', sig.apiKey)
  form.append('timestamp', sig.timestamp)
  form.append('signature', sig.signature)
  form.append('folder', sig.folder)
  form.append('use_filename', 'true')
  form.append('unique_filename', 'true')

  const result = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', sig.uploadUrl)
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress?.(Math.round((e.loaded / e.total) * 100))
    xhr.onload = () => {
      let data = {}
      try {
        data = JSON.parse(xhr.responseText)
      } catch {
        // handled below
      }
      if (xhr.status >= 200 && xhr.status < 300) resolve(data)
      else reject(new Error(data.error?.message || `Upload failed (${xhr.status})`))
    }
    xhr.onerror = () => reject(new Error('Upload failed — check your connection and try again.'))
    xhr.send(form)
  })

  return {
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
    width: result.width ?? null,
    height: result.height ?? null,
    bytes: result.bytes,
    format: result.format || file.name.split('.').pop(),
    name: file.name,
  }
}

export function pickFiles(accept, multiple = false) {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accept
    input.multiple = multiple
    input.onchange = () => resolve(Array.from(input.files || []))
    input.click()
  })
}
