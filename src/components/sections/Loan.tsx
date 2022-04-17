import React from 'react'

import { Input } from '../inputs/Input'
import { InputTotal } from '../inputs/InputTotal'
import { InputMonthYear } from '../inputs/InputMonthYear'
import { InputTotalMonthYear } from '../inputs/InputTotalMonthYear'
import { Paper } from '../ui/Paper'
import { Spacer } from '../ui/Spacer'
import { useCalculatorStore } from '../../store/CalculatorStore'

export const Loan: React.FunctionComponent = () => {
  const [state] = useCalculatorStore()
  return (
    <Paper title="Kreditkosten">
      <InputTotal
        label="Beleihungsbetrag"
        stateKey="loan_total"
        stateKeys={['cost_total', 'budget']}
        newVal={state.main.cost_total.val - state.main.budget.val}
      />
      <Spacer />
      <Input label="Zinsbindung (Jahre)" stateKey="loan_length" type="number" />
      <Spacer />
      <InputMonthYear label="Kreditrate" stateKey="loan_installment" />
      <Spacer />
      <Input label="Restschuld" stateKey="loan_outstanding" />
      <Spacer />
      <InputTotalMonthYear
        label="Kreditkosten"
        stateKey="loan_cost_total"
        yearSuffix="_total"
        stateKeys={[
          'loan_installment',
          'loan_length',
          'loan_outstanding',
          'loan_total',
        ]}
        newVal={
          state.main.loan_installment_year.val * state.main.loan_length.val +
          state.main.loan_outstanding.val -
          state.main.loan_total.val
        }
        dividedBy={state.main.loan_length.val}
        monthLabel="Jahr"
        yearLabel="Gesamt"
      />
    </Paper>
  )
}
