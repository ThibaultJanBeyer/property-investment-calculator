import React from 'react'
import NumberFormat from 'react-number-format'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

export const NumberFormatField = React.forwardRef<
  NumberFormat<any>,
  CustomProps
>((props, ref) => {
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
})
