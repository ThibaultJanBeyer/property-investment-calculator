import * as React from 'react'
import { CssBaseline, darkScrollbar } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { Calculator } from './components/Calculator'

export const App = () => {
  const theme = createTheme({
    typography: {
      fontSize: 10,
      allVariants: {
        color: '#37424A',
        fontSize: '2rem',
      },
      fontFamily: '"Merriweather Sans", sans-serif',
      h1: {
        fontFamily: '"Yeseva One", serif',
        fontSize: '7rem',
        letterSpacing: '-0.03rem',
        marginTop: '1rem',
      },
      h2: {
        fontFamily: '"Yeseva One", serif',
        fontSize: '4rem',
        letterSpacing: '-0.02rem',
        marginTop: '1rem',
      },
      h3: {
        fontFamily: '"Yeseva One", serif',
        fontSize: '3rem',
        letterSpacing: '-0.01rem',
        marginTop: '1rem',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            ...darkScrollbar(),
            color: '#37424A',
            backgroundColor: '#F2D653',
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{}}>
        <Calculator />
      </div>
    </ThemeProvider>
  )
}
