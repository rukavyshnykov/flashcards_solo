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

import c from './AddNewDeck.module.scss'

export const AddNewDeckForm = ({
  changeModalState,
  createNewDeck,
  primaryTextButton,
}: AddNewDeckProps) => {
  const [cover, setCover] = useState<File | null>(null)

  const coverURL = cover && URL.createObjectURL(cover)
  const AddNewDeckSchema = z.object({
    isPrivate: z.boolean(),
    name: z.string().min(3).max(20),
  })

  type AddNewDeckType = z.infer<typeof AddNewDeckSchema>

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AddNewDeckType>({ resolver: zodResolver(AddNewDeckSchema) })

  const onSubmit = (args: AddNewDeckType) => {
    createNewDeck({ ...args, cover })
  }

  return (
    <form className={c.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        control={control}
        errorMessage={errors.name?.message}
        label={'Deck name'}
        name={'name'}
        type={'text'}
      />
      {cover && <img src={coverURL ?? ''} />}
      <FileUploader
        fullWidth
        icon={<Icon fill={'white'} height={16} iconId={'picture'} width={16} />}
        setFile={setCover}
      >
        Upload Image
      </FileUploader>
      <ControlledCheckbox control={control} label={'Private pack'} name={'isPrivate'} />
      <FormButtons
        changeModalState={changeModalState}
        primaryButtonText={primaryTextButton}
        withSecondary
      />
    </form>
  )
}

type AddNewDeckProps = {
  changeModalState: (value: boolean) => void
  createNewDeck: (args: CreateDeckArgs) => void
  primaryTextButton: string
}
