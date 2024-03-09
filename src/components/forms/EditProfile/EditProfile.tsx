import { useState } from 'react'
import { useForm } from 'react-hook-form'

import placeholder from '@/assets/placeholder.jpg'
import { ControlledInput } from '@/components/controlled/ControlledInput'
import { useGetMeQuery, useSetMeMutation } from '@/components/pages/Login/authApi'
import { EditProfileArgs } from '@/components/pages/Login/authTypes'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FileUploader } from '@/components/ui/FileUploader'
import { Icon } from '@/components/ui/Icon/Icon'
import { Typography } from '@/components/ui/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import c from './EditProfile.module.scss'

const editProfileSchema = z.object({
  name: z.string().min(2),
})

export const EditProfileForm = ({ onSubmit }: EditProfileFormProps) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const { data: me } = useGetMeQuery()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(editProfileSchema),
  })

  return (
    <Card>
      <Typography variant={'h1'}>Personal Information</Typography>
      <Avatar isEditMode={editMode} />
      {!editMode ? (
        <div className={c.info}>
          <div className={c.name}>
            <Typography variant={'h2'}>{me?.name}</Typography>
            <Button
              className={c.icon}
              icon={<Icon fill={'white'} height={16} iconId={'edit'} width={16} />}
              onClick={() => setEditMode(!editMode)}
              variant={'blank'}
            />
          </div>
          <Typography className={c.email} variant={'body2'}>
            {me?.email}
          </Typography>
          <Button
            icon={<Icon fill={'white'} height={16} iconId={'out'} width={16} />}
            variant={'secondary'}
          >
            <Typography variant={'subtitle2'}>Logout</Typography>
          </Button>
        </div>
      ) : (
        <form className={c.form} onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            control={control}
            defaultValue={''}
            errorMessage={errors.name?.message}
            label={'Nickname'}
            name={'name'}
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

//TODO create separate file form avatar component

const Avatar = ({ avatar = placeholder, isEditMode }: AvatarProps) => {
  const [setNewImage] = useSetMeMutation()
  const { data } = useGetMeQuery()

  const src = data?.avatar

  const setFile = (file: File) => {
    setNewImage({ avatar: file })
  }

  return (
    <div className={c.avatar}>
      <img className={c.image} src={src} />
      {!isEditMode && (
        <FileUploader
          className={c.edit}
          icon={<Icon fill={'white'} height={16} iconId={'edit'} width={16} />}
          setFile={setFile}
        />
      )}
    </div>
  )
}

type AvatarProps = {
  avatar?: string
  isEditMode?: boolean
}

type FormValues = z.infer<typeof editProfileSchema>

type EditProfileFormProps = {
  onSubmit: (name: EditProfileArgs) => void
}
