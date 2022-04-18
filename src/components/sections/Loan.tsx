import React, { useEffect, useState } from 'react'

import { Input } from '../inputs/Input'
import { InputTotal } from '../inputs/InputTotal'
import { InputMonthYear } from '../inputs/InputMonthYear'
import { Paper } from '../ui/Paper'
import { Spacer } from '../ui/Spacer'
import { Duoline } from '../ui/Duoline'
import { calcUpdateVal, useCalculatorStore } from '../../store/CalculatorStore'

export const Loan: React.FunctionComponent = () => {
  const [state, dispatch] = useCalculatorStore()
  const [noLoan, setNoLoan] = useState(false)

  useEffect(() => {
    if (state.main.cost_total.val - state.main.budget.val <= 0) {
      dispatch(calcUpdateVal('loan_installment_year', 0))
      dispatch(calcUpdateVal('loan_outstanding', 0))
      dispatch(calcUpdateVal('loan_length', 1))
      setNoLoan(true)
    } else if (noLoan) {
      const fakeInstallment = state.main.cost_total.val * 0.05
      const fakeOutstanding = state.main.cost_total.val * 0.75
      dispatch(calcUpdateVal('loan_installment_year', fakeInstallment))
      dispatch(calcUpdateVal('loan_outstanding', fakeOutstanding))
      dispatch(calcUpdateVal('loan_length', 10))
      setNoLoan(false)
    }
  }, [state.main.cost_total.val, state.main.budget.val])

  return (
    <Paper title="Kreditkosten">
      {noLoan && 'Kein Kredit notwendig'}
      <div style={noLoan ? { display: 'none' } : {}}>
        <InputTotal
          label="Beleihungsbetrag"
          stateKey="loan_total"
          stateKeys={['cost_total', 'budget']}
          newVal={state.main.cost_total.val - state.main.budget.val}
        />
        <Spacer />
        <Input
          label="Zinsbindung (Jahre)"
          stateKey="loan_length"
          type="number"
        />
        <Spacer />
        <InputMonthYear label="Kreditrate" stateKey="loan_installment" />
        <Spacer />
        <Input label="Restschuld" stateKey="loan_outstanding" />
        <Spacer />
        <Duoline isEven>
          <div style={{ marginRight: '15px' }}>
            <InputTotal
              label="Kreditkosten /Jahr"
              stateKey="loan_cost"
              stateKeys={[
                'loan_installment_year',
                'loan_length',
                'loan_outstanding',
                'loan_total',
              ]}
              newVal={
                (state.main.loan_installment_year.val *
                  state.main.loan_length.val +
                  state.main.loan_outstanding.val -
                  state.main.loan_total.val) /
                state.main.loan_length.val
              }
            />
          </div>
          <InputTotal
            label="/Gesamt"
            stateKey="loan_cost_total"
            stateKeys={[
              'loan_installment_year',
              'loan_length',
              'loan_outstanding',
              'loan_total',
            ]}
            newVal={
              state.main.loan_installment_year.val *
                state.main.loan_length.val +
              state.main.loan_outstanding.val -
              state.main.loan_total.val
            }
          />
        </Duoline>
      </div>
    </Paper>
  )
}
