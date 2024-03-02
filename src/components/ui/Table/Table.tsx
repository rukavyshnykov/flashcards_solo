import { ComponentPropsWithoutRef, FC } from 'react'

import c from './Table.module.scss'

const Root: FC<ComponentPropsWithoutRef<'table'>> = ({ className, ...rest }) => {
  return <table className={c.root + ` ${className}`} {...rest} />
}

const Head: FC<ComponentPropsWithoutRef<'thead'>> = ({ className, ...rest }) => {
  return <thead className={c.head + ` ${className}`} {...rest} />
}

const HeadCell: FC<ComponentPropsWithoutRef<'th'>> = ({ className, ...rest }) => {
  return <th className={c.headCell + ` ${className}`} {...rest} />
}

const Body: FC<ComponentPropsWithoutRef<'tbody'>> = ({ className, ...rest }) => {
  return <tbody className={c.body + ` ${className}`} {...rest} />
}

const Row: FC<ComponentPropsWithoutRef<'tr'>> = ({ className, ...rest }) => {
  return <tr className={c.row + ` ${className}`} {...rest} />
}

const Cell: FC<ComponentPropsWithoutRef<'td'>> = ({ className, ...rest }) => {
  return <td className={c.cell + ` ${className}`} {...rest} />
}

const Empty: FC<ComponentPropsWithoutRef<'div'>> = ({ className, ...rest }) => {
  return <div className={c.empty + ` ${className}`} {...rest} />
}

export const Table = { Body, Cell, Empty, Head, HeadCell, Root, Row }
