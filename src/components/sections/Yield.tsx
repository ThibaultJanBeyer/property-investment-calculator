import React from 'react'

import { InputValuePercent } from '../inputs/InputValuePercent'
import { Paper } from '../ui/Paper'

export const Yield: React.FunctionComponent = () => (
  <Paper title="Rendite" overlayStyle={{ background: 'rgba(0, 255, 0, .2)' }}>
    <InputValuePercent
      label="Renditewunsch /Jahr"
      stateKey="yield"
      from="budget"
    />
  </Paper>
)
