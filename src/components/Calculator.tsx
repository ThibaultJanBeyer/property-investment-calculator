import React from 'react'

import { useCalculatorStore } from '../store/CalculatorStore'
import { Input, InputPercentValue, InputTotal, MaintenanceFees } from './inputs'

export const Calculator: React.FunctionComponent = () => {
  const [state] = useCalculatorStore()
  return (
    <div className="App">
      <Input label="Kaufpreis" stateKey="cost_purchase" />
      <InputPercentValue
        label="Kaufnebenkosten"
        stateKey="cost_addition"
        from="cost_purchase"
      />
      <InputTotal
        label="Gesammtkosten"
        stateKey="cost_total"
        stateKeys={['cost_purchase', 'cost_addition']}
      />
      <InputPercentValue
        label="Eigenanteit"
        stateKey="budget"
        from="cost_total"
      />
      <MaintenanceFees />
      <textarea
        name=""
        id=""
        cols={50}
        rows={30}
        value={JSON.stringify(state, null, 2)}
      ></textarea>
    </div>
  )
}
