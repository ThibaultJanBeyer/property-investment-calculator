import React from 'react'
import { Typography, Icon } from '@mui/material'
import { MapsHomeWork } from '@mui/icons-material'

import { CalcCards } from './sections/CalcCards'
import { ImportExport } from './sections/ImportExport'
import { Spacer } from './ui/Spacer'

export const Calculator: React.FunctionComponent = () => (
  <>
    <Spacer size="huge" />
    <div style={{ maxWidth: '60rem', margin: 'auto', padding: '0 10px' }}>
      <Typography variant="h1" component="h1" style={{ fontWeight: 'bolder' }}>
        <Icon component={MapsHomeWork} fontSize="inherit" />
        <br />
        Immobilien&shy;kauf
        <br />
        Vermietungs
        <br />
        Rendite&shy;rechner
      </Typography>
      <Spacer />
      <Typography component="p">
        Wieviel Miet&shy;einnahmen brauchst du um deine Rendite&shy;ziele zu
        erreichen? Mit diesem Rechner kannst du die nötige Miet&shy;höhe anhand
        deiner Kosten für dein Rendite&shy;ziel errechnen. Anschließend werden
        dir, grund&shy;legende Tipps mit auf den Weg gegeben.
      </Typography>
    </div>
    <Spacer size="huge" />
    <CalcCards />
    <Spacer size="huge" />
    <ImportExport />
    <Spacer size="huge" />
  </>
)
