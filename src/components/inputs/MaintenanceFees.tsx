import React, { useEffect } from 'react'
import { calcUpdateVal, useCalculatorStore } from '../../store/CalculatorStore'

import { Input } from './Input'

export const MaintenanceFees: React.FunctionComponent = () => {
  const [state, dispatch] = useCalculatorStore()

  useEffect(() => {
    dispatch(
      calcUpdateVal(
        'maintenance_fees_m',
        state.main.maintenance_fees_y.val / 12
      )
    )
  }, [state.main.maintenance_fees_y.val])

  useEffect(() => {
    dispatch(
      calcUpdateVal(
        'maintenance_fees_y',
        state.main.maintenance_fees_m.val * 12
      )
    )
  }, [state.main.maintenance_fees_m.val])

  return (
    <>
      <Input label="Hausgeld / Monat" stateKey="maintenance_fees_m" />
      <Input label="Hausgeld / Jahr" stateKey="maintenance_fees_y" />
    </>
  )
}
