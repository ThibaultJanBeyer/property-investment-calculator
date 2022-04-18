import React from 'react'
import { useMediaQuery } from '@mui/material'

import { Summary } from './Summary'
import { Purchase } from './Purchase'
import { Loan } from './Loan'
import { Yield } from './Yield'
import { Rent } from './Rent'
import { Maintenance } from './Maintenance'
import { Tax } from './Tax'

export const CalcCards: React.FunctionComponent = () => {
  const isMobile = useMediaQuery('(max-width:600px)')
  if (isMobile)
    return (
      <>
        <Purchase />
        <Loan />
        <Maintenance />
        <Tax />
        <Yield />
        <Rent />
        <Summary />
      </>
    )
  return (
    <div
      style={{
        maxWidth: '100rem',
        margin: 'auto',
        display: 'grid',
        gap: '50px',
        gridTemplateColumns: '1fr 1fr',
        justifyItems: 'center',
        // gridTemplateRows: 'masonry',
      }}
    >
      <div
        style={{
          display: 'grid',
          gap: '50px',
          gridTemplateRows: 'repeat(3, max-content)',
        }}
      >
        <Purchase />
        <Loan />
        <Rent />
      </div>
      <div
        style={{
          display: 'grid',
          gap: '50px',
          gridTemplateRows: 'repeat(4, max-content)',
        }}
      >
        <Maintenance />
        <Yield />
        <Tax />
        <Summary />
      </div>
    </div>
  )
}
