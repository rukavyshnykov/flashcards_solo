import c from './form-buttons.module.scss'

import { Button } from '../Button'
import { Typography } from '../Typography'

export const FormButtons = ({
  changeModalState,
  onClick,
  primaryButtonText,
  withSecondary,
}: FormButtonsProps) => {
  return (
    <>
      {withSecondary ? (
        <div className={c.footer}>
          <Button variant={'secondary'}>
            <Typography onClick={() => changeModalState(false)} variant={'subtitle2'}>
              Cancel
            </Typography>
          </Button>
          <Button onClick={() => onClick?.()} variant={'primary'}>
            <Typography variant={'subtitle2'}>{primaryButtonText}</Typography>
          </Button>
        </div>
      ) : (
        <div className={c.footer + ' ' + c.only_primary}>
          <Button onClick={() => onClick?.()} variant={'primary'}>
            <Typography variant={'subtitle2'}>{primaryButtonText}</Typography>
          </Button>
        </div>
      )}
    </>
  )
}

type FormButtonsProps = {
  changeModalState: (open: boolean) => void
  onClick?: () => void
  primaryButtonText: string
  withSecondary?: boolean
}
