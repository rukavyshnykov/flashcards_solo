import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import checkEmail from '@/assets/check-email.png'
import { ControlledInput } from '@/components/controlled/ControlledInput'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import c from './ForgotPassword.module.scss'

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof forgotPasswordSchema>

export const ForgotPasswordForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const onSubmit = (data: any) => {
    setIsSuccess(true)
    console.log(data)
  }

  return (
    <Card>
      {!isSuccess ? (
        <>
          <Typography variant={'h1'}>Forgot your password?</Typography>
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
              <Typography className={c.caption} variant={'body2'}>
                Enter your email address and we will send you further instructions
              </Typography>
            </div>
            <Button fullWidth type={'submit'}>
              Send Instructions
            </Button>
            <div className={c.formFooter}>
              <Typography className={c.caption} variant={'body2'}>
                Did you remember your password?
              </Typography>
              <Typography as={Link} className={c.signUp} to={'/login'} variant={'body1'}>
                Try logging in
              </Typography>
            </div>
          </form>
        </>
      ) : (
        <>
          <Typography variant={'h1'}>Check Email</Typography>
          <div className={c.content}>
            <img src={checkEmail} />
            <Typography className={c.caption} variant={'body2'}>
              We've sent an Email with instructions to example@mail.com
            </Typography>
          </div>
          <Button fullWidth>
            <Typography variant={'subtitle2'}>Send Instructions</Typography>
          </Button>
        </>
      )}
    </Card>
  )
}
