import React from 'react'
import {
  TextField,
  Icon,
  InputAdornment,
  Checkbox,
  Tooltip,
  Typography,
} from '@mui/material'
import { Lock, LockOpenOutlined } from '@mui/icons-material'

import { NumberFormatField } from './NumberFormatField'
import { ReadOnlyTextField } from './ReadOnlyTextField'
import {
  CalcStateKeys,
  calcUpdateVal,
  calcUpdateLock,
  useCalculatorStore,
} from '../../store/CalculatorStore'

export const Input: React.FunctionComponent<{
  type?: 'currency' | 'percent' | 'number'
  label: string
  stateKey: CalcStateKeys
  disabled?: boolean
  readOnly?: boolean
}> = ({ type = 'currency', label, stateKey, disabled, readOnly }) => {
  const [state, dispatch] = useCalculatorStore()

  const storeItem = state.main[stateKey]

  let typeIcon
  let friendlyVal = `${storeItem.val}`
  if (type === 'percent') {
    typeIcon = '%'
    friendlyVal = (storeItem.val * 100).toFixed(0)
  }
  if (type === 'currency') {
    typeIcon = '€'
    friendlyVal = storeItem.val.toFixed(2)
  }

  const Field = readOnly ? ReadOnlyTextField : TextField

  return (
    <Field
      style={{ width: '100%' }}
      label={label}
      InputProps={{
        endAdornment: (
          <>
            {typeIcon ? (
              <InputAdornment position="end">{typeIcon}</InputAdornment>
            ) : (
              ''
            )}
            {'locked' in storeItem ? (
              <Tooltip
                title={
                  <Typography
                    component="p"
                    style={{ color: 'rgb(246, 246, 246)' }}
                  >
                    Lock
                  </Typography>
                }
              >
                <Checkbox
                  icon={<Icon fontSize="large" component={LockOpenOutlined} />}
                  checkedIcon={<Icon fontSize="large" component={Lock} />}
                  checked={disabled || storeItem.locked}
                  onClick={() =>
                    dispatch(calcUpdateLock(stateKey, !storeItem.locked))
                  }
                  color="default"
                />
              </Tooltip>
            ) : (
              ''
            )}
          </>
        ),
        readOnly: readOnly || storeItem.locked,
        inputComponent: NumberFormatField as any,
      }}
      variant="standard"
      disabled={disabled}
      value={friendlyVal}
      onFocus={() => {
        if ('locked' in storeItem) dispatch(calcUpdateLock(stateKey, false))
      }}
      onChange={(e) => {
        dispatch(
          calcUpdateVal(
            stateKey,
            type === 'percent'
              ? +(e.target as any).value / 100
              : +(e.target as any).value
          )
        )
      }}
    />
  )
}
