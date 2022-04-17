import React from 'react'
import { Paper as MuiPaper, Typography } from '@mui/material'
import { Spacer } from './Spacer'

export const Paper: React.FC<
  React.PropsWithChildren<{
    title: string
    style?: React.CSSProperties
    overlayStyle?: React.CSSProperties
  }>
> = ({ children, title, style = {}, overlayStyle = {} }) => (
  <MuiPaper
    elevation={24}
    style={{
      width: '350px',
      margin: '10px',
      ...style,
    }}
  >
    <div style={{ padding: '30px 30px 50px', ...overlayStyle }}>
      <Typography component="h2">{title}</Typography>
      <Spacer size="small" />
      {children}
    </div>
  </MuiPaper>
)
