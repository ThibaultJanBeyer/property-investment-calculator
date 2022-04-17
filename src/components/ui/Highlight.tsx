import React from 'react'

export const Highlight: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => (
  <div
    style={{
      display: 'inline-block',
      backgroundImage:
        '-webkit-linear-gradient(bottom,transparent 0%,transparent 30%,rgba(237,215,105,.7) 30%,rgba(255,255,0,.5) 80%,transparent 80%,transparent 100%)',
    }}
  >
    {children}
  </div>
)
