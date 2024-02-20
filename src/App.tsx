import { useState } from 'react'

import { Card } from '@/components/ui/Card'

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
      <Card />
    </>
  )
}
