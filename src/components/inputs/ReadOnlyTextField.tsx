import { styled, TextField } from '@mui/material'

// MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before
export const ReadOnlyTextField = styled(TextField)(({ theme }) => ({
  '& .MuiFormLabel-root': {
    color: theme.palette.text.secondary,
    '&.Mui-focused': {
      color: theme.palette.text.secondary,
    },
  },
  '& .MuiInput-underline': {
    '&:before': {
      borderBottom: `1px solid rgba(0,0,0,0.1)`,
    },
    '&:after': {
      border: 0,
    },
    '&:hover': {
      '&:before': {
        borderBottom: `1px solid rgba(0,0,0,0.1)`,
      },
      '&:after': {
        border: 0,
      },
    },
  },
}))
