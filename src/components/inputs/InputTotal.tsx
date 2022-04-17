import React, { useEffect } from 'react'
import {
  CalcStateKeys,
  calcUpdateVal,
  useCalculatorStore,
} from '../../store/CalculatorStore'

import { Input } from './Input'

export const InputTotal: React.FunctionComponent<{
  stateKey: CalcStateKeys
  newVal: number
  stateKeys: CalcStateKeys[]
  label: string
}> = ({ stateKeys, label, stateKey, newVal }) => {
  const [state, dispatch] = useCalculatorStore()

  useEffect(
    () => {
      dispatch(calcUpdateVal(stateKey, newVal))
    },
    stateKeys.map((key) => state.main[key].val)
  )

  return <Input label={label} stateKey={stateKey} readOnly />
}
