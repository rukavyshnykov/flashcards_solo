import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ControlledInput } from '@/components/controlled/ControlledInput'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import c from './SignUp.module.scss'

const registerSchema = z
  .object({
    confirmPassword: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(3).max(30),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const SignUpForm = ({ onSubmit }: RegisterFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  return (
    <Card>
      <Typography variant={'h1'}>Sign Up</Typography>
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
          <ControlledInput
            control={control}
            defaultValue={''}
            errorMessage={errors.confirmPassword?.message}
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
          <Typography as={Link} className={c.signUp} to={'/login'} variant={'body1'}>
            Sign In
          </Typography>
        </div>
      </form>
    </Card>
  )
}

export type RegisterFormValues = z.infer<typeof registerSchema>

type RegisterFormProps = {
  onSubmit: (data: any) => void
}
