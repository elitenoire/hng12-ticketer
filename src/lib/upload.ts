type ErrorResponse = {
  error: string
}

type UploadResponse = {
  url: string
}

export async function upload(file: File): Promise<UploadResponse | ErrorResponse> {
  try {
    const cloudUrl = import.meta.env.VITE_CLOUDINARY_URL
    const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    const cloud_name = import.meta.env.VITE_CLOUDINARY_NAME

    if (!upload_preset || !cloud_name) {
      throw new Error('Cloudinary environment variables are not set.')
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', upload_preset)

    const cloudinaryUrl = cloudUrl
      ? new URL(cloudUrl)
      : `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = (await response.json()) as { message: string }
      throw new Error(error.message || 'Failed to upload image!')
    }

    const imageUrl = await response.json()
    return imageUrl
  } catch (error) {
    console.error('🔴[Cloudinary]:Error uploading image:', error)
    return { error: (error as Error).message || 'An unknown error occurred.' }
  }
}
