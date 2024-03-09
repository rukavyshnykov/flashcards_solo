import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ControlledCheckbox } from '@/components/controlled/ControlledCheckbox'
import { ControlledInput } from '@/components/controlled/ControlledInput'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import c from './Login.module.scss'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().optional(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <Card>
      <Typography variant={'h1'}>Sign In</Typography>
      <form className={c.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={c.inputsWrapper}>
          <ControlledInput
            control={control}
            defaultValue={''}
            errorMessage={errors.email?.message}
            label={'Email'}
            name={'email'}
            type={'text'}
          />
          <ControlledInput
            control={control}
            defaultValue={''}
            errorMessage={errors.password?.message}
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
        <Typography
          as={Link}
          className={c.forgotPassword}
          to={'/forgot-password'}
          variant={'body2'}
        >
          Forgot Password?
        </Typography>
        <Button fullWidth type={'submit'}>
          Sign In
        </Button>
        <div className={c.formFooter}>
          <Typography className={c.caption} variant={'body2'}>
            Don't have an account?
          </Typography>
          <Typography as={Link} className={c.signUp} to={'/register'} variant={'body1'}>
            Sign Up
          </Typography>
        </div>
      </form>
    </Card>
  )
}

type LoginFormProps = {
  onSubmit: (data: LoginFormValues) => void
}
