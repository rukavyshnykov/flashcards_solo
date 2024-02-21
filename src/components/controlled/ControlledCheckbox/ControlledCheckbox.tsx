import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { SuperCheckbox, SuperCheckboxProps } from '@/components/ui/Checkbox'

export type ControlledCheckboxProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    Omit<SuperCheckboxProps, 'checked' | 'disabled' | 'onCheckedChange'>

export const ControlledCheckbox = <TFieldValues extends FieldValues>({
  label,
  ...useControllerValues
}: ControlledCheckboxProps<TFieldValues>) => {
  const {
    field: { disabled, name, onChange, ref, value },
  } = useController({ ...useControllerValues })

  return (
    <SuperCheckbox
      checked={value}
      disabled={disabled}
      label={label}
      name={name}
      onCheckedChange={onChange}
      ref={ref}
    />
  )
}
