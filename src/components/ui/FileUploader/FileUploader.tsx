import { ChangeEvent } from 'react'

import c from './FileUploader.module.scss'

import { Button, ButtonProps } from '../Button'

export const FileUploader = ({ children, className, setFile, ...rest }: FileUploaderProps) => {
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  return (
    <Button
      as={'label'}
      className={c.fileInputLabel + ` ${!children ? c.onlyIcon : ''} ` + className}
      variant={'secondary'}
      {...rest}
    >
      <input className={c.input} onChange={onImageChange} type={'file'} />
      {children}
    </Button>
  )
}

type FileUploaderProps = {
  setFile: (file: File) => void
} & ButtonProps
