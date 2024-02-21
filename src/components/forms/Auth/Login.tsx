import { useForm } from 'react-hook-form'

import { ControlledCheckbox } from '@/components/controlled/ControlledCheckbox'
import { ControlledInput } from '@/components/controlled/ControlledInput'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'

import c from './Login.module.scss'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Card>
      <Typography variant={'h1'}>Sign In</Typography>
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
        </div>
        <ControlledCheckbox
          control={control}
          defaultValue={false}
          label={'Remember me'}
          name={'rememberMe'}
        />
        <Typography as={'a'} className={c.forgotPassword} href={'#'} variant={'body2'}>
          Forgot Password?
        </Typography>
        <Button fullWidth type={'submit'}>
          Sign In
        </Button>
        <div className={c.formFooter}>
          <Typography className={c.caption} variant={'body2'}>
            Don't have an account?
          </Typography>
          <Typography className={c.signUp} variant={'body1'}>
            Sign Up
          </Typography>
        </div>
      </form>
    </Card>
  )
}
