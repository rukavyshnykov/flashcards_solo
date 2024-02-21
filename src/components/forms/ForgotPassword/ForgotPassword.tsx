import { useForm } from 'react-hook-form'

import { ControlledInput } from '@/components/controlled/ControlledInput'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'

import c from './ForgotPassword.module.scss'

type FormValues = {
  email: string
}

export const ForgotPasswordForm = () => {
  const { control, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Card>
      <Typography variant={'h1'}>Forgot your password?</Typography>
      <form className={c.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={c.inputsWrapper}>
          <ControlledInput
            control={control}
            defaultValue={''}
            label={'Email'}
            name={'email'}
            type={'text'}
          />
          <Typography className={c.caption} variant={'body2'}>
            Enter your email address and we will send you further instructions{' '}
          </Typography>
        </div>
        <Button fullWidth type={'submit'}>
          Send Instructions
        </Button>
        <div className={c.formFooter}>
          <Typography className={c.caption} variant={'body2'}>
            Did you remember your password?
          </Typography>
          <Typography className={c.signUp} variant={'body1'}>
            Try logging in
          </Typography>
        </div>
      </form>
    </Card>
  )
}
