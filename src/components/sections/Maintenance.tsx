import React from 'react'

import { InputMonthYear } from '../inputs/InputMonthYear'
import { InputValuePercent } from '../inputs/InputValuePercent'
import { Paper } from '../ui/Paper'
import { Spacer } from '../ui/Spacer'

export const Maintenance: React.FunctionComponent = () => (
  <Paper title="Laufende Kosten">
    <InputMonthYear label="Hausgeld" stateKey="maintenance_fees" />
    <Spacer />
    <InputValuePercent
      label="Hausgeld nicht umlegbar /Jahr"
      stateKey="maintenance_fees_fix"
      from="maintenance_fees_year"
    />
    <Spacer />
    <InputValuePercent
      label="Instandhaltungskosten /Jahr"
      stateKey="maintenance_repair"
      from="yield"
    />
  </Paper>
)
