import { useState } from 'react'

import { LoginForm } from './components/forms/Auth'
import { SuperCheckbox } from './components/ui/Checkbox'
import { Input } from './components/ui/Input/Input'

export function App() {
  const [value, setValue] = useState('')

  return (
    <>
      <div>Hello</div>
      <Input
        label={'check'}
        onChange={e => setValue(e.target.value)}
        placeholder={'just checking'}
        type={'password'}
        value={value}
      />
      <SuperCheckbox />
      <LoginForm />
    </>
  )
}
