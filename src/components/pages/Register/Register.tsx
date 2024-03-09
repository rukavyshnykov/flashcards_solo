import { useNavigate } from 'react-router-dom'

import { RegisterFormValues, SignUpForm } from '@/components/forms/SignUp'

import { useLoginMutation, useRegisterMutation } from '../Login/authApi'

export const RegisterPage = () => {
  const [register] = useRegisterMutation()
  const [login] = useLoginMutation()

  const navigate = useNavigate()

  const onSubmit = async ({ email, password }: RegisterFormValues) => {
    register({ email, password })
      .unwrap()
      .then(() => {
        login({ email, password })
          .unwrap()
          .then(() => navigate('/'))
      })
  }

  return <SignUpForm onSubmit={onSubmit} />
}
