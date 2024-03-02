import { LoginForm } from './components/forms/Auth'
import { EditProfileForm } from './components/forms/EditProfile'
import { Dropdown, DropdownItem } from './components/ui/Dropdown/Dropdown'
import { Header } from './components/ui/Header'

export function App() {
  return (
    <>
      <Header />
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
