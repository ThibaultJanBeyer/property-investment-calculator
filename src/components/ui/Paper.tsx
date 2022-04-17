import React from 'react'
import { Paper as MuiPaper, Typography } from '@mui/material'

import { Spacer } from './Spacer'
import { Highlight } from './Highlight'

export const Paper: React.FC<
  React.PropsWithChildren<{
    title: string
    style?: React.CSSProperties
    overlayStyle?: React.CSSProperties
    highlight?: boolean
  }>
> = ({ children, title, style = {}, overlayStyle = {}, highlight }) => (
  <MuiPaper
    color="red"
    elevation={24}
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
  </MuiPaper>
)
