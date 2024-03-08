import { useNavigate } from 'react-router-dom'

import { LoginForm, LoginFormValues } from '@/components/forms/Auth'

import { useLoginMutation } from './authApi'

export const LoginPage = () => {
  const navigate = useNavigate()

  const [login] = useLoginMutation()

  const onSubmit = (data: LoginFormValues) => {
    login(data)
      .unwrap()
      .then(() => {
        navigate('/')
      })
  }

  return <LoginForm onSubmit={onSubmit} />
}
