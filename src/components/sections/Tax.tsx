import React from 'react'

import { Input } from '../inputs/Input'
import { InputTotal } from '../inputs/InputTotal'
import { Paper } from '../ui/Paper'
import { Spacer } from '../ui/Spacer'
import {
  baseTaxDeductionPercent,
  useCalculatorStore,
} from '../../store/CalculatorStore'
import { InputTotalMonthYear } from '../inputs/InputTotalMonthYear'

export const Tax: React.FunctionComponent = () => {
  const [state] = useCalculatorStore()
  return (
    <Paper title="Steuerbelastung">
      <Input label="Steuersatz" stateKey="tax_rate" type="percent" />
      <Spacer />
      <InputTotal
        label={`Jährliche Steuerabschreibung (${
          baseTaxDeductionPercent * 100
        }% auf Anschaffungskosten)`}
        stateKey="tax_deduction"
        stateKeys={['cost_total']}
        newVal={state.main.cost_total.val * baseTaxDeductionPercent}
      />
      <Spacer />
      <InputTotalMonthYear
        label="Steuerbelastung"
        stateKey="tax_total_year"
        stateKeys={[
          'rent_pretax_year',
          'tax_deduction',
          'loan_cost',
          'tax_rate',
        ]}
        newVal={
          (state.main.rent_pretax_year.val -
            state.main.tax_deduction.val -
            state.main.loan_cost.val) *
          state.main.tax_rate.val
        }
      />
    </Paper>
  )
}
