import { useForm } from 'react-hook-form'

import { ControlledInput } from '@/components/controlled/ControlledInput'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import c from './CreateNewPassword.module.scss'

const newPasswordSchema = z.object({
  password: z.string().min(3),
})

type FormValues = z.infer<typeof newPasswordSchema>

export const CreateNewPasswordForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(newPasswordSchema),
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Card>
      <Typography variant={'h1'}>Create new password</Typography>
      <form className={c.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={c.inputsWrapper}>
          <ControlledInput
            control={control}
            defaultValue={''}
            errorMessage={errors.password?.message}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
          <Typography className={c.caption} variant={'body2'}>
            Create new password and we will send you further instructions to email
          </Typography>
        </div>
        <Button fullWidth type={'submit'}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
