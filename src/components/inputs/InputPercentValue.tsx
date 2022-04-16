import React, { useEffect } from 'react'
import {
  CalcStateKeys,
  calcUpdateLock,
  calcUpdateVal,
  useCalculatorStore,
} from '../../store/CalculatorStore'

import { Input } from './Input'

export const InputPercentValueWrapper: React.FunctionComponent<{
  friendlyName: string
  field: CalcStateKeys
  otherField: CalcStateKeys
  totalField: CalcStateKeys
  type: 'percent' | 'currency'
}> = ({ friendlyName, field, otherField, totalField, type }) => {
  const [state, dispatch] = useCalculatorStore()

  const { locked } = state.main[field]
  const { locked: otherLocked, val: otherVal } = state.main[otherField]
  const { val: totalVal } = state.main[totalField]

  const val = type === 'percent' ? otherVal / totalVal : otherVal * totalVal

  // toggle the lock to be the opposite else than the corresponding value
  useEffect(() => dispatch(calcUpdateLock(field, !otherLocked)), [otherLocked])

  // this is a side-effect from a change in the total value, it only works on the unlocked prop
  useEffect(() => {
    if (locked) dispatch(calcUpdateVal(field, val))
  }, [totalVal])

  // this is a side-effect from the corresponding value, it only affects the corresponding locked prop (the one not being actively manipulated)
  useEffect(() => {
    if (locked) dispatch(calcUpdateVal(field, val))
  }, [otherVal])

  return <Input label={friendlyName} stateKey={field} type={type} />
}

export const InputPercentValue: React.FunctionComponent<{
  stateKey: CalcStateKeys
  from: CalcStateKeys
  label: string
}> = ({ stateKey, from, label }) => (
  <>
    <InputPercentValueWrapper
      field={stateKey}
      otherField={`${stateKey}_percent` as CalcStateKeys}
      totalField={from}
      friendlyName={label}
      type="currency"
    />
    <InputPercentValueWrapper
      field={`${stateKey}_percent` as CalcStateKeys}
      otherField={stateKey}
      totalField={from}
      friendlyName={`${label} %`}
      type="percent"
    />
  </>
)
