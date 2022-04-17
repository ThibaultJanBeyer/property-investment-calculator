import React from 'react'
import { Typography, Icon } from '@mui/material'
import { MapsHomeWork } from '@mui/icons-material'

import { Maintenance } from './sections/Maintenance'
import { Purchase } from './sections/Purchase'
import { Yield } from './sections/Yield'
import { Loan } from './sections/Loan'
import { Tax } from './sections/Tax'
import { Rent } from './sections/Rent'
import { ImportExport } from './sections/ImportExport'
import { Summary } from './sections/Summary'
import { Spacer } from './ui/Spacer'

export const Calculator: React.FunctionComponent = () => (
  <div className="App">
    <Spacer size="huge" />
    <div style={{ maxWidth: '60rem', margin: 'auto' }}>
      <Typography variant="h1" component="h1" style={{ fontWeight: 'bolder' }}>
        <Icon component={MapsHomeWork} fontSize="inherit" />
        Immobilienkauf
        <br />
        Vermietungs
        <br />
        Renditerechner
      </Typography>
      <Spacer />
      <Typography component="p">
        Wieviel Mieteinnahmen brauchst du um deine Renditeziele zu erreichen?
        Mit diesem Rechner kannst du die nötige Miethöhe anhand deiner Kosten
        für dein Renditeziel errechnen. Anschließend werden dir, grundlegende
        Tipps mit auf den Weg gebracht
      </Typography>
    </div>
    <Spacer size="huge" />
    <div
      style={{
        // Should become Masonry
        maxWidth: '100rem',
        margin: 'auto',
        display: 'grid',
        gap: '50px',
        gridTemplateColumns: '1fr 1fr',
        justifyItems: 'center',
        // gridTemplateRows: 'masonry',
      }}
    >
      <div
        style={{
          display: 'grid',
          gap: '50px',
          gridTemplateRows: 'repeat(3, max-content)',
        }}
      >
        <Summary />
        <Purchase />
        <Loan />
      </div>
      <div
        style={{
          display: 'grid',
          gap: '50px',
          gridTemplateRows: 'repeat(4, max-content)',
        }}
      >
        <Yield />
        <Rent />
        <Maintenance />
        <Tax />
      </div>
    </div>
    <Spacer size="huge" />
    <ImportExport />
    <Spacer size="huge" />
  </div>
)
