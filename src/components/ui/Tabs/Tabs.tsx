import * as RadixTabs from '@radix-ui/react-tabs'

import c from './Tabs.module.scss'

import { Typography } from '../Typography'

export const Tabs = ({ onChange, options, value }: TabsProps) => (
  <div className={c.root}>
    <Typography variant={'body2'}>Show decks cards</Typography>
    <RadixTabs.Root onValueChange={onChange} value={value}>
      <RadixTabs.List>
        {options.map(({ label, value }: TabsOption) => (
          <RadixTabs.Trigger className={c.trigger} key={value} value={value}>
            <Typography variant={'body1'}>{label}</Typography>
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  </div>
)

type TabsProps = {
  onChange: (value: string) => void
  options: TabsOption[]
  value: string
}

type TabsOption = {
  label: string
  value: string
}
