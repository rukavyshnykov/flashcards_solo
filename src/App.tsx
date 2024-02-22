import { useState } from 'react'

import { CreateNewPasswordForm } from './components/forms/CreateNewPassword'
import { EditProfileForm } from './components/forms/EditProfile'
import { Button } from './components/ui/Button'
import { FileUploader } from './components/ui/FileUploader/FileUploader'

export function App() {
  const [src, setSrc] = useState<string>('')

  const setImageSrc = (source: string) => {
    setSrc(source)
  }

  return (
    <>
      <div>Hello</div>
      <CreateNewPasswordForm />
      <Button iconId={'edit'} variant={'secondary'}>
        dfaskdjfhskjd
      </Button>
      <img src={src} />
      <FileUploader fullWidth={false} iconId={'edit'} setImageSrc={setImageSrc} />
      <EditProfileForm />
    </>
  )
}
