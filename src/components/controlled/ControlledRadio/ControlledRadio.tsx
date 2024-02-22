import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Radio, RadioProps } from '@/components/ui/Radio'

const mockOptions = [
  { label: 'Science', value: '1' },
  { label: 'Sports', value: '2' },
  { label: 'Movie', value: '3' },
  { label: 'Technology', value: '4' },
  { label: 'Music', value: '5' },
]

export const ControlledRadio = <TFieldValues extends FieldValues>({
  options = mockOptions,
  ...useControllerValues
}: ControlledRadioProps<TFieldValues>) => {
  const {
    field: { disabled, name, onChange, ref, value },
  } = useController({
    ...useControllerValues,
  })

  return (
    <Radio
      disabled={disabled}
      name={name}
      onValueChange={onChange}
      options={options}
      ref={ref}
      value={value}
    />
  )
}

type ControlledRadioProps<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> &
  Omit<RadioProps, 'onChange'>
