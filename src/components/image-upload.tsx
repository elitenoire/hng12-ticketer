import { useCallback, useState } from 'react'
import type {
  FileRejection,
  DropzoneRootProps,
  DropzoneInputProps,
  DropzoneState,
} from 'react-dropzone'
import { useDropzone } from 'react-dropzone'

import CloudSVG from '@/assets/cloud.svg?react'

import { cn } from '@/lib/utils'

type ImageUploadProps = {
  id: string
  onChange?: (image: string) => void
  onError?: (error: string) => void
}

export function ImageUpload({ id, onChange, onError }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const { file, errors } = fileRejections[0]
        const error = `${file.name}: ${errors.map((e) => e.message).join(', ')}`
        console.error('🔴[Image Upload Error]: ', error)
        onError?.(error)
        return
      }
      const image = acceptedFiles[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)

      reader.onabort = () => {
        console.error('🔴[Image Upload Error]: Image preview was aborted')
        onError?.('Image preview was aborted')
      }
      reader.onerror = () => {
        console.error('🔴[Image Upload Error]: Failed to preview image')
        onError?.('Unable to preview image')
      }
      reader.onload = () => {
        const imageUrl = reader.result as string
        setSelectedImage(imageUrl)
        onChange?.(imageUrl)
      }
    },
    [onChange, onError]
  )

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
  }: {
    acceptedFiles: File[]
  } & DropzoneRootProps &
    DropzoneInputProps &
    DropzoneState = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    maxSize: 1000 * 1024,
    multiple: false,
  })

  console.log('Accepted Files:', acceptedFiles)

  return (
    <div className="rounded-inherit text-foreground-muted group relative size-full overflow-hidden border-4 border-primary/50 bg-border">
      <div
        {...getRootProps()}
        className={cn(
          'dropzone relative z-10 flex h-full cursor-pointer flex-col items-center justify-center gap-4 p-6 text-center transition-opacity duration-300 ease-out',
          selectedImage && 'bg-black/30 opacity-0 group-hover:opacity-100'
        )}
      >
        <input {...getInputProps({ id, 'aria-describedby': `${id}-helper` })} />
        <CloudSVG className="size-8 fill-current" aria-hidden />
        <p id={`${id}-helper`} role="region" aria-live="polite">
          {isDragActive ? 'Drop the image here' : 'Drag & drop or click to upload'}
        </p>
      </div>
      {selectedImage && (
        <div className="absolute inset-0">
          <img
            src={selectedImage}
            alt="Image preview"
            className="size-full object-cover object-center"
          />
        </div>
      )}
    </div>
  )
}

export default ImageUpload
