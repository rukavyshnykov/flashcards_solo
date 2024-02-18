import { useState } from 'react'

import { SuperSelect } from './components/ui/Select'

export function App() {
  const mockOptions = [
    { label: 'opt1', value: 'opt1' },
    { label: 'opt2', value: 'opt2' },
    { label: 'opt3', value: 'opt3' },
    { label: 'opt4', value: 'opt4' },
    { label: 'opt5', value: 'opt5' },
  ]

  const [state, setState] = useState(mockOptions[0].value)
  const handleSelectChange = (value: string) => {
    setState(value)
  }

  return (
    <>
      <div>Hello</div>
      <SuperSelect handleSelectChange={handleSelectChange} options={mockOptions} value={state} />
    </>
  )
}
