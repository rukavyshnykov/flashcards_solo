import { EditProfileForm } from '@/components/forms/EditProfile'

import { useSetMeMutation } from '../Login/authApi'
import { EditProfileArgs } from '../Login/authTypes'

export const MyProfilePage = () => {
  const [setName] = useSetMeMutation()
  const onSubmit = ({ name }: EditProfileArgs) => {
    setName({ name })
  }

  return <EditProfileForm onSubmit={onSubmit} />
}
