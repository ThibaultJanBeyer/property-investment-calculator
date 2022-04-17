import React from 'react'

import { InputTotalMonthYear } from '../inputs/InputTotalMonthYear'
import { Paper } from '../ui/Paper'
import { Spacer } from '../ui/Spacer'
import { useCalculatorStore } from '../../store/CalculatorStore'

export const Rent: React.FunctionComponent = () => {
  const [state] = useCalculatorStore()
  return (
    <Paper
      title="Notwendige Mieteinnahmen"
      overlayStyle={{ background: 'rgba(0, 0, 255, .1)' }}
    >
      <InputTotalMonthYear
        label="Kaltmiete"
        stateKey="rent_pretax_year"
        stateKeys={[
          'yield',
          'loan_installment_year',
          'maintenance_fees_fix',
          'maintenance_repair',
          'loan_cost',
        ]}
        newVal={
          state.main.yield.val +
          state.main.loan_installment_year.val +
          state.main.maintenance_fees_fix.val +
          state.main.maintenance_repair.val +
          state.main.loan_cost.val
        }
      />
      <Spacer />
      <InputTotalMonthYear
        label="Kaltmiete Effektiv"
        stateKey="rent_effective_year"
        stateKeys={['rent_pretax_year', 'tax_total']}
        newVal={state.main.rent_pretax_year.val + state.main.tax_total.val}
      />
    </Paper>
  )
}
