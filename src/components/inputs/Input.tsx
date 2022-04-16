import React from 'react'
import { TextField, InputAdornment, Checkbox } from '@mui/material'
import { Lock, LockOpenOutlined } from '@mui/icons-material'
import NumberFormat from 'react-number-format'

import {
  CalcStateKeys,
  calcUpdateVal,
  calcUpdateLock,
  useCalculatorStore,
} from '../../store/CalculatorStore'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const NumberFormatCustom = React.forwardRef<NumberFormat<any>, CustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values, { source }) => {
          // bail if it was changed via side-effect and not vie human interaction
          if (source !== 'event') return
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          })
        }}
        thousandSeparator="."
        decimalSeparator=","
        isNumericString
      />
    )
  }
)

export const Input: React.FunctionComponent<{
  type?: 'currency' | 'percent'
  label: string
  stateKey: CalcStateKeys
  disabled?: boolean
}> = ({ type = 'currency', label, stateKey, disabled }) => {
  const [state, dispatch] = useCalculatorStore()

  const storeItem = state.main[stateKey]

  const typeIcon = type === 'percent' ? '%' : '€'
  const friendlyVal = (
    type === 'percent' ? storeItem.val * 100 : storeItem.val
  ).toFixed(2)

  return (
    <TextField
      label={label}
      InputProps={{
        endAdornment: (
          <>
            <InputAdornment position="end">{typeIcon}</InputAdornment>{' '}
            {'locked' in storeItem ? (
              <Checkbox
                icon={<LockOpenOutlined />}
                checkedIcon={<Lock />}
                checked={disabled || storeItem.locked}
                onClick={() =>
                  dispatch(calcUpdateLock(stateKey, !storeItem.locked))
                }
                color="default"
              />
            ) : (
              ''
            )}
          </>
        ),
        readOnly: storeItem.locked,
        inputComponent: NumberFormatCustom as any,
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
