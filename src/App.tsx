import { LoginForm } from './components/forms/Auth'
import { EditProfileForm } from './components/forms/EditProfile'
import { Dropdown, DropdownItem } from './components/ui/Dropdown/Dropdown'
import { Input } from './components/ui/Input'

export function App() {
  return (
    <>
      <Dropdown>
        <DropdownItem>check</DropdownItem>
        <DropdownItem>checkOne</DropdownItem>
        <DropdownItem>checkOneTWO</DropdownItem>
      </Dropdown>
      <EditProfileForm />
      <LoginForm />
    </>
  )
}
