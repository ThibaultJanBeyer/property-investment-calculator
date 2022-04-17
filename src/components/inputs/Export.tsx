import { Button } from '@mui/material'
import React from 'react'

import { useCalculatorStore } from '../../store/CalculatorStore'

// Function to download data to a file
const download = (data: any, filename: any, type: any) => {
  const file = new Blob([data], { type })
  // Others
  const a = document.createElement('a')
  const url = URL.createObjectURL(file)
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, 0)
}

export const Export: React.FC<any> = () => {
  const [state] = useCalculatorStore()
  return (
    <Button
      variant="outlined"
      color="inherit"
      style={{ textTransform: 'inherit' }}
      onClick={() => {
        download(
          JSON.stringify(
            Object.entries(state.main).reduce(
              (prev, [key, obj]) => ({ ...prev, [key]: obj.val }),
              {}
            ),
            null,
            2
          ),
          `IVR-${new Date().toISOString()}.json`,
          'json'
        )
      }}
    >
      Exportieren
    </Button>
  )
}
