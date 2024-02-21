import { useForm } from 'react-hook-form'

import { ControlledInput } from '@/components/controlled/ControlledInput'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'

import c from './SignUp.module.scss'

type FormValues = {
  confirmPassword: string
  email: string
  password: string
}

export const SignUpForm = () => {
  const { control, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Card>
      <Typography variant={'h1'}>Sign Up</Typography>
      <form className={c.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={c.inputsWrapper}>
          <ControlledInput
            control={control}
            defaultValue={''}
            label={'Email'}
            name={'email'}
            type={'text'}
          />
          <ControlledInput
            control={control}
            defaultValue={''}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
          <ControlledInput
            control={control}
            defaultValue={''}
            label={'Confirm Password'}
            name={'confirmPassword'}
            type={'password'}
          />
        </div>
        <Button fullWidth type={'submit'}>
          Sign Up
        </Button>
        <div className={c.formFooter}>
          <Typography className={c.caption} variant={'body2'}>
            Already have an account?
          </Typography>
          <Typography className={c.signUp} variant={'body1'}>
            Sign In
          </Typography>
        </div>
      </form>
    </Card>
  )
}
