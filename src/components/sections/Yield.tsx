import React from 'react'

import { InputValuePercent } from '../inputs/InputValuePercent'
import { Paper } from '../ui/Paper'

export const Yield: React.FunctionComponent = () => (
  <Paper title="Rendite" highlight>
    <InputValuePercent
      label="Renditewunsch /Jahr"
      stateKey="yield"
      from="budget"
    />
  </Paper>
)
