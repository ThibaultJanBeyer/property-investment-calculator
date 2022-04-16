import React, { useEffect } from 'react'
import {
  CalcStateKeys,
  calcUpdateVal,
  useCalculatorStore,
} from '../../store/CalculatorStore'

import { Input } from './Input'

export const InputTotal: React.FunctionComponent<{
  stateKey: CalcStateKeys
  stateKeys: CalcStateKeys[]
  label: string
}> = ({ stateKeys, label, stateKey }) => {
  const [state, dispatch] = useCalculatorStore()

  useEffect(
    () => {
      dispatch(
        calcUpdateVal(
          stateKey,
          stateKeys.map((key) => state.main[key].val).reduce((a, b) => a + b)
        )
      )
    },
    stateKeys.map((key) => state.main[key].val)
  )

  return <Input label={label} stateKey={stateKey} disabled />
}
