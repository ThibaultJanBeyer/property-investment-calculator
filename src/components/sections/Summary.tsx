import React from 'react'
import { Typography } from '@mui/material'

import { Paper } from '../ui/Paper'
import { Highlight } from '../ui/Highlight'
import { useCalculatorStore } from '../../store/CalculatorStore'

export const Summary: React.FunctionComponent = () => {
  const [state] = useCalculatorStore()
  const currencyFormat = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  })
  return (
    <Paper title="Zusammenfassung">
      <Typography component="p">
        Um eine effektive Netto-Rendite von{' '}
        <Highlight>
          {(state.main.yield_percent.val * 100).toFixed(0)}%
        </Highlight>{' '}
        zu erzielen bei einem Kaufpreis von{' '}
        {currencyFormat.format(state.main.cost_total.val)} und einer
        Kreditaufnahme von {currencyFormat.format(state.main.loan_total.val)}{' '}
        muss diese Immobilie eine Kaltmiete von{' '}
        <Highlight>
          {currencyFormat.format(state.main.rent_effective.val)}
        </Highlight>{' '}
        erzielen.
      </Typography>
    </Paper>
  )
}
