import React, { useEffect } from 'react'
import {
  CalcStateKeys,
  calcUpdateLock,
  calcUpdateVal,
  useCalculatorStore,
} from '../../store/CalculatorStore'

import { Input } from './Input'
import { Duoline } from '../ui/Duoline'

export const InputMonthYearWrapper: React.FunctionComponent<{
  friendlyName: string
  field: CalcStateKeys
  otherField: CalcStateKeys
  type: 'month' | 'year'
}> = ({ friendlyName, field, otherField, type }) => {
  const [state, dispatch] = useCalculatorStore()

  const { locked } = state.main[field]
  const { locked: otherLocked, val: otherVal } = state.main[otherField]

  const val = type === 'year' ? otherVal * 12 : otherVal / 12

  // toggle the lock to be the opposite else than the corresponding value
  useEffect(() => dispatch(calcUpdateLock(field, !otherLocked)), [otherLocked])

  // this is a side-effect from the corresponding value, it only affects the corresponding locked prop (the one not being actively manipulated)
  useEffect(() => {
    if (locked) dispatch(calcUpdateVal(field, val))
  }, [otherVal])

  return <Input label={friendlyName} stateKey={field} type={'currency'} />
}

export const InputMonthYear: React.FunctionComponent<{
  stateKey: CalcStateKeys
  label: string
}> = ({ stateKey, label }) => (
  <Duoline isEven>
    <InputMonthYearWrapper
      field={`${stateKey}_year` as CalcStateKeys}
      otherField={stateKey}
      friendlyName={`${label} /Jahr`}
      type="year"
    />
    <InputMonthYearWrapper
      field={stateKey}
      otherField={`${stateKey}_year` as CalcStateKeys}
      friendlyName={`${label} /Monat`}
      type="month"
    />
  </Duoline>
)
