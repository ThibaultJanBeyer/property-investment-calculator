import React from 'react'

import { Input } from '../inputs/Input'
import { InputTotal } from '../inputs/InputTotal'
import { InputValuePercent } from '../inputs/InputValuePercent'
import { Paper } from '../ui/Paper'
import { Spacer } from '../ui/Spacer'
import { useCalculatorStore } from '../../store/CalculatorStore'

export const Purchase: React.FunctionComponent = () => {
  const [state] = useCalculatorStore()
  return (
    <Paper title="Kaufkosten">
      <Input label="Kaufpreis" stateKey="cost_purchase" />
      <Spacer />
      <InputValuePercent
        label="Kaufnebenkosten"
        stateKey="cost_addition"
        from="cost_purchase"
      />
      <Spacer />
      <InputTotal
        label="Gesammtkosten"
        stateKey="cost_total"
        stateKeys={['cost_purchase', 'cost_addition']}
        newVal={state.main.cost_purchase.val + state.main.cost_addition.val}
      />
      <Spacer />
      <InputValuePercent
        label="Eigenanteit"
        stateKey="budget"
        from="cost_total"
      />
    </Paper>
  )
}
