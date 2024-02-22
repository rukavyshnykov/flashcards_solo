import { useState } from 'react'
import { useForm } from 'react-hook-form'

import placeholder from '@/assets/placeholder.jpg'
import { ControlledInput } from '@/components/controlled/ControlledInput'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FileUploader } from '@/components/ui/FileUploader'
import { Icon } from '@/components/ui/Icon/Icon'
import { Input } from '@/components/ui/Input'
import { Typography } from '@/components/ui/Typography'

import c from './EditProfile.module.scss'

export const EditProfileForm = () => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const { control, handleSubmit } = useForm<FormValues>()

  return (
    <Card>
      <Typography variant={'h1'}>Personal Information</Typography>
      <Avatar isEditMode={editMode} />
      {!editMode ? (
        <div className={c.info}>
          <div className={c.name}>
            <Typography variant={'h2'}>Name</Typography>
            <Icon
              className={c.icon}
              fill={'white'}
              height={16}
              iconId={'edit'}
              onClick={() => setEditMode(!editMode)}
              width={16}
            />
          </div>
          <Typography className={c.email} variant={'body2'}>
            email@mail.com
          </Typography>
          <Button iconId={'out'} variant={'secondary'}>
            <Typography variant={'subtitle2'}>Logout</Typography>
          </Button>
        </div>
      ) : (
        <form className={c.form}>
          <ControlledInput
            control={control}
            defaultValue={''}
            label={'Nickname'}
            name={'nickname'}
            type={'text'}
          />
          <Button fullWidth type={'submit'} variant={'primary'}>
            <Typography variant={'subtitle2'}>Save Changes</Typography>
          </Button>
        </form>
      )}
    </Card>
  )
}

const Avatar = ({ avatar = placeholder, isEditMode }: AvatarProps) => {
  const [src, setSrc] = useState<string>(avatar)
  const onImageChange = (avatar: string) => {
    setSrc(avatar)
  }

  return (
    <div className={c.avatar}>
      <img className={c.image} src={src} />
      {!isEditMode && (
        <FileUploader className={c.edit} iconId={'edit'} setImageSrc={onImageChange} />
      )}
    </div>
  )
}

type AvatarProps = {
  avatar?: string
  isEditMode?: boolean
}

type FormValues = {
  nickname: string
}
