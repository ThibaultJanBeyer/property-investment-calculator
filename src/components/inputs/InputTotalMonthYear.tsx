import React from 'react'
import { CalcStateKeys } from '../../store/CalculatorStore'
import { Duoline } from '../ui/Duoline'

import { InputTotal } from './InputTotal'

export const InputTotalMonthYear: React.FunctionComponent<{
  stateKey: CalcStateKeys
  newVal: number
  stateKeys: CalcStateKeys[]
  label: string
  isBaseMonth?: boolean
  dividedBy?: number
  monthLabel?: string
  yearLabel?: string
  yearSuffix?: string
}> = ({
  stateKeys,
  label,
  stateKey,
  newVal,
  isBaseMonth,
  dividedBy = 12,
  monthLabel = 'Monat',
  yearLabel = 'Jahr',
  yearSuffix = '_year',
}) => {
  const baseStateKey = stateKey.replace(yearSuffix, '')

  return (
    <Duoline isEven>
      <div style={{ marginRight: '15px' }}>
        <InputTotal
          stateKey={`${baseStateKey}${yearSuffix}` as CalcStateKeys}
          newVal={isBaseMonth ? newVal * dividedBy : newVal}
          stateKeys={stateKeys}
          label={`${label} /${yearLabel}`}
        />
      </div>
      <InputTotal
        stateKey={baseStateKey as CalcStateKeys}
        newVal={isBaseMonth ? newVal : newVal / dividedBy}
        stateKeys={stateKeys}
        label={`/${monthLabel}`}
      />
    </Duoline>
  )
}
