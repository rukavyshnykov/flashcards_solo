import { useState } from 'react'

import { SuperModal } from './components/ui/modal/modal'
import { SuperSelect } from './components/ui/select/select'

export function App() {
  // const [open, setOpen] = useState<boolean>(true)

  // const changeOpen = (open: boolean) => {
  //   setOpen(!open)
  // }

  return (
    <>
      <div>Hello</div>
      <SuperSelect />
      {/* <SuperModal open={open} setOpen={changeOpen} title={'check'} withSecondary={false}>
        bla bla
      </SuperModal> */}
    </>
  )
}
