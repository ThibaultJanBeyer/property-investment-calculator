import React from 'react'
import { Paper as MuiPaper, Typography, styled } from '@mui/material'

import { Spacer } from './Spacer'
import { Highlight } from './Highlight'

const StyledPaper = styled(MuiPaper)(() => ({
  '&.MuiPaper-root': {
    '@media (max-width:600px)': {
      borderRadius: 0,
      boxShadow: 'inherit',
      padding: '20px 0',
    },
    '@media (min-width:600px)': {
      borderRadius: '5px',
      boxShadow:
        'rgb(0 0 0 / 10%) 0px 10px 10px -7px, 2px 5px 15px 0 rgb(0 0 0 / 15%)',
      transition:
        'box-shadow 500ms ease-in-out 0ms, transform 500ms ease-in-out',
      '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow:
          'rgb(0 0 0 / 15%) 0px 10px 12px -7px, 2px 5px 15px 0 rgb(0 0 0 / 20%), rgb(0 0 0 / 12%) 0px 9px 40px 8px',
      },
    },
  },
}))

export const Paper: React.FC<
  React.PropsWithChildren<{
    title: string
    style?: React.CSSProperties
    overlayStyle?: React.CSSProperties
    highlight?: boolean
  }>
> = ({ children, title, style = {}, overlayStyle = {}, highlight }) => (
  <StyledPaper
    style={{
      backgroundColor: '#f6f6f6',
      ...style,
    }}
  >
    <div style={{ padding: '30px 30px 50px', ...overlayStyle }}>
      <Typography component="h2" variant="h2">
        {highlight ? (
          <>
            <Highlight>{title.split(' ')[0]}</Highlight>
            {title.split(' ').slice(1).join(' ')}
          </>
        ) : (
          title
        )}
      </Typography>
      <Spacer size="small" />
      {children}
    </div>
  </StyledPaper>
)
