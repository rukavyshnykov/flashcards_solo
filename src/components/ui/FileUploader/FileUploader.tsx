import { ChangeEvent } from 'react'

import c from './FileUploader.module.scss'

import { Button, ButtonProps } from '../Button'

export const FileUploader = ({ children, setImageSrc, ...rest }: FileUploaderProps) => {
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageSrc(URL.createObjectURL(event.target.files[0]))
    }
  }

  return (
    <Button
      as={'label'}
      className={c.fileInputLabel + ` ${!children ? c.onlyIcon : ''}`}
      variant={'secondary'}
      {...rest}
    >
      <input className={c.input} onChange={onImageChange} type={'file'} />
      {children}
    </Button>
  )
}

type FileUploaderProps = {
  setImageSrc: (src: string) => void
} & ButtonProps
