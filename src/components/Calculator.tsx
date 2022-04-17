import React from 'react'
import { Typography, TextField } from '@mui/material'

import {
  calcSetState,
  CalcState,
  CalcStateKeys,
  useCalculatorStore,
} from '../store/CalculatorStore'

import { Maintenance } from './sections/Maintenance'
import { Purchase } from './sections/Purchase'
import { Yield } from './sections/Yield'
import { Loan } from './sections/Loan'
import { Tax } from './sections/Tax'
import { Rent } from './sections/Rent'

export const Calculator: React.FunctionComponent = () => {
  const [state, dispatch] = useCalculatorStore()
  return (
    <div className="App">
      <Typography component="h1">
        Immobilienkauf Finanzierung Renditerechner
      </Typography>

      <div
        style={
          {
            // Should become Masonry
            // display: 'grid',
            // gap: '30px',
            // gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            // gridTemplateRows: 'masonry',
          }
        }
      >
        <Yield />
        <Purchase />
        <Maintenance />
        <Loan />
        <Tax />
        <Rent />
      </div>

      <Typography component="p">
        Um eine effektive Netto-Rendite von{' '}
        <strong style={{ color: 'green' }}>
          {(state.main.yield_percent.val * 100).toFixed(0)}%
        </strong>{' '}
        zu erzielen muss diese Immobilie für eine Kaltmiete von{' '}
        <strong style={{ color: 'lightsalmon' }}>
          {state.main.rent_effective.val.toFixed(2)}€
        </strong>{' '}
        im Monat vermietet werden.
      </Typography>

      <Typography component="p">Export</Typography>

      <TextField
        multiline
        rows={30}
        style={{ width: '100%' }}
        value={JSON.stringify(
          Object.entries(state.main).reduce(
            (prev, [key, obj]) => ({ ...prev, [key]: obj.val }),
            {}
          ),
          null,
          2
        )}
        onChange={(e) => {
          // @TODO: import does not work
          try {
            const parsed: { [key in CalcStateKeys]: number } = JSON.parse(
              e.target.value
            )
            const mapped: CalcState = Object.entries(parsed).reduce(
              (prev, [key, val]) => ({
                ...prev,
                [key]: {
                  ...state.main[key as CalcStateKeys],
                  val,
                },
              }),
              { ...state }
            )
            dispatch(calcSetState(mapped))
          } catch (err) {
            console.error(err)
          }
        }}
      />
    </div>
  )
}
