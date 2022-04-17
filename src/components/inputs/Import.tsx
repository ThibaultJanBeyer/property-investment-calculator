import React from 'react'
import { Button } from '@mui/material'

import {
  calcSetState,
  CalcState,
  CalcStateKeys,
  useCalculatorStore,
} from '../../store/CalculatorStore'

export const Import: React.FC<any> = () => {
  const [state, dispatch] = useCalculatorStore()
  return (
    <Button
      variant="outlined"
      color="inherit"
      component="label"
      style={{ textTransform: 'inherit' }}
    >
      Importieren
      <input
        type="file"
        hidden
        onChange={(event: any) => {
          const reader = new FileReader()
          reader.onload = (_event: any) => {
            const parsed = JSON.parse(_event.target.result)
            const mapped: CalcState = Object.entries(parsed).reduce(
              (prev: CalcState, [key, val]) => ({
                ...prev,
                main: {
                  ...prev.main,
                  [key]: {
                    ...prev.main[key as CalcStateKeys],
                    val,
                  },
                },
              }),
              { ...state }
            )
            dispatch(calcSetState(mapped))
          }
          reader.readAsText(event.target.files[0])
        }}
      />
    </Button>
  )
}
