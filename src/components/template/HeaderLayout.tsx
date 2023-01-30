import { FC, ReactNode } from 'react'
import React from 'react'
import Header from '../organisms/layout/Header'

type Props = {
  children: ReactNode
}

export const HeaderLayout: FC<Props> = (props) => {
  const { children } = props
  return (
    <>
      <Header />
      {children}
    </>
  )
}
