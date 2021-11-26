import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { Slider, Typography, Box, Grid } from '@mui/material'
import { useLocation } from 'react-router-dom'
import AppBar from '../components/AppBar'
import RenderedBuildOrderTable from '../components/RenderedBuildOrderTable'
import { valueText } from '../utils/Slider'
// import '../index.css'

const Build = function Build() {
  const {
    state: { description, difficulty, civ, buildOrderRowAge1, buildOrderRowAge2, buildOrderRowAge3, buildOrderRowAge4 },
  } = useLocation()
  return (
    <div>
      <AppBar />
      <div
        style={{
          backgroundColor: '#212121',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'calc(10px + 2vmin)',
          color: 'white',
        }}
      >
        <Typography variant="h3" component="h3" mb={5} mt={2}>
          AoEIVBuildOrders
        </Typography>
      </div>
      <div
        style={{
          backgroundColor: '#212121',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'calc(10px + 2vmin)',
          color: 'white',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ flexGrow: 1, width: '70%' }}>
          <Grid container spacing={2}>
            {isEmpty(description) ? (
              <div />
            ) : (
              <div>
                <Grid item sm={12}>
                  <Typography variant="h6">Description</Typography>
                </Grid>
                <Grid item sm={12}>
                  <Typography>{description}</Typography>
                </Grid>
              </div>
            )}
            <Grid item sm={6}>
              <div>
                <Typography sx={{ textAlign: 'center' }}>Civilization:</Typography>
                <Typography sx={{ textAlign: 'center' }}>{civ}</Typography>
              </div>
            </Grid>
            <Grid item sm={6}>
              <div style={{ alignItems: 'center' }}>
                <Typography gutterBottom sx={{ textAlign: 'center' }}>
                  Difficulty
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Slider
                    aria-label="Difficulty"
                    defaultValue={difficulty}
                    // eslint-disable-next-line react/jsx-no-bind
                    getAriaValueText={valueText}
                    valueLabelDisplay="auto"
                    disabled
                    step={1}
                    marks
                    min={0}
                    max={10}
                    color="secondary"
                    sx={{ width: '200px', justifyContent: 'center', textAlign: 'center' }}
                  />
                </Box>
              </div>
            </Grid>

            <Grid item sm={12}>
              <RenderedBuildOrderTable buildOrderData={buildOrderRowAge1} ageNumber={1} />
              <RenderedBuildOrderTable buildOrderData={buildOrderRowAge2} ageNumber={2} />
              <RenderedBuildOrderTable buildOrderData={buildOrderRowAge3} ageNumber={3} />
              <RenderedBuildOrderTable buildOrderData={buildOrderRowAge4} ageNumber={4} />
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  )
}

export default Build
