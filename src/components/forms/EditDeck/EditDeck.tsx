import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledCheckbox } from '@/components/controlled/ControlledCheckbox'
import { ControlledInput } from '@/components/controlled/ControlledInput'
import { CreateDeckArgs } from '@/components/pages/Decks/decksTypes'
import { FileUploader } from '@/components/ui/FileUploader'
import { FormButtons } from '@/components/ui/FormButtons'
import { Icon } from '@/components/ui/Icon/Icon'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import c from './EditDeck.module.scss'

export const EditDeckForm = ({
  changeModalState,
  editDeck,
  primaryTextButton,
  name,
  coverSrc,
  isPrivate
}: EditDeckProps) => {
  const [cover, setCover] = useState<File | null>(null)

  const coverURL = coverSrc ? coverSrc : cover && URL.createObjectURL(cover)
  const EditDeckSchema = z.object({
    isPrivate: z.boolean(),
    name: z.string().min(3).max(20),
  })

  type EditDeckType = z.infer<typeof EditDeckSchema>

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EditDeckType>({ resolver: zodResolver(EditDeckSchema) })

  const onSubmit = (args: EditDeckType) => {
    editDeck({ ...args, cover })
  }

  return (
    <form className={c.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        control={control}
        errorMessage={errors.name?.message}
        label={'Deck name'}
        name={'name'}
        type={'text'}
        defaultValue={name}
      />
      <img src={coverURL ?? coverSrc ?? ''} />
      <FileUploader
        fullWidth
        icon={<Icon fill={'white'} height={16} iconId={'picture'} width={16} />}
        setFile={setCover}
      >
        Upload Image
      </FileUploader>
      <ControlledCheckbox control={control} label={'Private pack'} name={'isPrivate'} defaultValue={isPrivate}/>
      <FormButtons
        changeModalState={changeModalState}
        primaryButtonText={primaryTextButton}
        withSecondary
      />
    </form>
  )
}

type EditDeckProps = {
  changeModalState: (value: boolean) => void
  editDeck: (args: CreateDeckArgs) => void
  primaryTextButton: string
  coverSrc: string | null
  name: string
  isPrivate: boolean
}
