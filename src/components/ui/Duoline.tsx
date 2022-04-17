import React from 'react'

export const Duoline: React.FC<
  React.PropsWithChildren<{
    style?: React.CSSProperties
    overlayStyle?: React.CSSProperties
    isEven?: boolean
  }>
> = ({ children, style = {}, isEven }) => (
  <div
    style={{
      display: 'grid',
      gap: '5px',
      gridTemplateColumns: `1fr ${isEven ? '1fr' : '100px'}`,
      alignItems: 'flex-end',
      ...style,
    }}
  >
    {children}
  </div>
)
