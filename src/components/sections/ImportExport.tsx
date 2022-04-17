import React from 'react'

import { Export } from '../inputs/Export'
import { Import } from '../inputs/Import'

export const ImportExport: React.FunctionComponent = () => (
  <div
    style={{
      textAlign: 'center',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '50px',
    }}
  >
    <div style={{ textAlign: 'right' }}>
      <Export />
    </div>
    <div style={{ textAlign: 'left' }}>
      <Import />
    </div>
  </div>
)
