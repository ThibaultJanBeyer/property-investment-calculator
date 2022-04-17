import React from 'react'

export const Spacer: React.FC<{ size?: 'large' | 'small' | 'huge' }> = ({
  size = 'large',
}) => {
  let margin
  if (size === 'huge') margin = '60px'
  if (size === 'large') margin = '30px'
  if (size === 'small') margin = '10px'
  return (
    <div
      style={{
        marginBottom: margin,
      }}
    ></div>
  )
}
