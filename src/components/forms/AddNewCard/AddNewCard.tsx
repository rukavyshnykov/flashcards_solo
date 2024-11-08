import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { ControlledInput } from '@/components/controlled/ControlledInput'
import { useCreateCardMutation } from '@/components/pages/Decks/decksApi'
import { CardArgs } from '@/components/pages/Decks/decksTypes'
import { FileUploader } from '@/components/ui/FileUploader'
import { FormButtons } from '@/components/ui/FormButtons'
import { Icon } from '@/components/ui/Icon/Icon'
import { Typography } from '@/components/ui/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import c from './AddNewCard.module.scss'

export const AddNewCardForm = ({ handleModalChange }: AddNewCardFormProps) => {
  const [questionCover, setQuestionCover] = useState<File | null>(null)
  const [answerCover, setAnswerCover] = useState<File | null>(null)

  const AddNewCardSchema = z.object({
    answer: z.string().min(3).max(20),
    question: z.string().min(3).max(20),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AddNewCardArgs>({
    resolver: zodResolver(AddNewCardSchema),
  })

  const { id } = useParams()
  const [createCard] = useCreateCardMutation()

  const onSubmit = (data: Omit<CardArgs, 'answerImg' | 'id' | 'questionImg'>) => {
    createCard({ ...data, answerImg: answerCover, id: id ?? '', questionImg: questionCover })
    handleModalChange(false)
  }

  type AddNewCardArgs = z.infer<typeof AddNewCardSchema>

  return (
    <form className={c.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        control={control}
        defaultValue={''}
        errorMessage={errors.question?.message}
        label={'Question'}
        name={'question'}
        type={'text'}
      />
      {questionCover && <img className={c.image} src={URL.createObjectURL(questionCover)} />}
      <FileUploader
        fullWidth
        icon={<Icon fill={'white'} height={16} iconId={'picture'} width={16} />}
        setFile={setQuestionCover}
      >
        <Typography variant={'subtitle2'}>Upload Image</Typography>
      </FileUploader>
      <ControlledInput
        control={control}
        defaultValue={''}
        errorMessage={errors.answer?.message}
        label={'Answer'}
        name={'answer'}
        type={'text'}
      />
      {answerCover && <img className={c.image} src={URL.createObjectURL(answerCover)} />}
      <FileUploader
        fullWidth
        icon={<Icon fill={'white'} height={16} iconId={'picture'} width={16} />}
        setFile={setAnswerCover}
      >
        <Typography variant={'subtitle2'}>Upload Image</Typography>
      </FileUploader>
      <FormButtons
        changeModalState={handleModalChange}
        primaryButtonText={'Add New Card'}
        withSecondary
      />
    </form>
  )
}

type AddNewCardFormProps = {
  handleModalChange: (value: boolean) => void
}
