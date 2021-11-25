/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import some from 'lodash/some'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import AppBar from './components/AppBar'
import BuildOrderTable, { BuildOrder } from './components/BuildOrderTable'
import BuildOrderForm from './components/BuildOrderForm'
import { CIVILIZATIONS } from './constants'
import './App.css'

const App = function App() {
  const [buildOrderRowAge1, setBuildOrderRowAge1] = useState<BuildOrder[]>([])
  const [buildOrderRowAge2, setBuildOrderRowAge2] = useState<BuildOrder[]>([])
  const [buildOrderRowAge3, setBuildOrderRowAge3] = useState<BuildOrder[]>([])
  const [buildOrderRowAge4, setBuildOrderRowAge4] = useState<BuildOrder[]>([])
  const [count1, setCount1] = useState(1)
  const [count2, setCount2] = useState(1)
  const [count3, setCount3] = useState(1)
  const [count4, setCount4] = useState(1)
  const [civ, setCiv] = useState(CIVILIZATIONS[0])
  const [age1, setAge1] = useState(false)
  const [age2, setAge2] = useState(false)
  const [age3, setAge3] = useState(false)
  const [age4, setAge4] = useState(false)
  const [age1Active, setAge1Active] = useState(false)
  const [age2Active, setAge2Active] = useState(false)
  const [age3Active, setAge3Active] = useState(false)
  const [age4Active, setAge4Active] = useState(false)

  // @TODO can make more performant using else if
  function getSetActiveBuildOrderAge() {
    if (age1Active === true) {
      return setBuildOrderRowAge1
    }
    if (age2Active === true) {
      return setBuildOrderRowAge2
    }
    if (age3Active === true) {
      return setBuildOrderRowAge3
    }
    if (age4Active === true) {
      return setBuildOrderRowAge4
    }
    return setBuildOrderRowAge4
  }

  function getActiveStatusFromAll() {
    return some([age1Active, age2Active, age3Active, age4Active])
  }

  function getActiveBuildOrderAge() {
    if (age1Active === true) {
      return buildOrderRowAge1
    }
    if (age2Active === true) {
      return buildOrderRowAge2
    }
    if (age3Active === true) {
      return buildOrderRowAge3
    }
    if (age4Active === true) {
      return buildOrderRowAge4
    }
    return buildOrderRowAge4
  }

  function getActiveSetCount() {
    if (age1Active === true) {
      return setCount1
    }
    if (age2Active === true) {
      return setCount2
    }
    if (age3Active === true) {
      return setCount3
    }
    if (age4Active === true) {
      return setCount4
    }
    return setCount4
  }

  function getActiveCount() {
    if (age1Active === true) {
      return count1
    }
    if (age2Active === true) {
      return count2
    }
    if (age3Active === true) {
      return count3
    }
    if (age4Active === true) {
      return count4
    }
    return count4
  }

  function setActive(active: string) {
    if (active === 'age1') {
      setAge1Active(true)
      setAge2Active(false)
      setAge3Active(false)
      setAge4Active(false)
    } else if (active === 'age2') {
      setAge1Active(false)
      setAge2Active(true)
      setAge3Active(false)
      setAge4Active(false)
    } else if (active === 'age3') {
      setAge1Active(false)
      setAge2Active(false)
      setAge3Active(true)
      setAge4Active(false)
    } else {
      setAge1Active(false)
      setAge2Active(false)
      setAge3Active(false)
      setAge4Active(true)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCiv(event.target.value)
  }

  function valuetext(value: number) {
    return `${value}`
  }

  return (
    <div className="App">
      <AppBar />
      <header className="App-header">
        <Typography variant="h3" component="h3" mb={5} mt={2}>
          Construct Your Build Order
        </Typography>
        <Box sx={{ flexGrow: 1, width: '70%' }}>
          <Grid container spacing={5}>
            <Grid item sm={8} xs={12}>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1 },
                }}
              >
                <BuildOrderForm
                  count={getActiveCount()}
                  getActiveStatusFromAll={getActiveStatusFromAll}
                  setCount={getActiveSetCount()}
                  getSetActiveBuildOrderAge={getSetActiveBuildOrderAge}
                  getActiveBuildOrderAge={getActiveBuildOrderAge}
                />

                <Grid
                  container
                  item
                  spacing={0}
                  sx={{ justifyContent: 'center', alignItems: 'center' }}
                  mt={3}
                  xs="auto"
                >
                  <Grid item md={1.5} sm="auto">
                    <Button
                      variant="outlined"
                      color="secondary"
                      type="submit"
                      sx={{ width: '80px', height: '38px' }}
                      onClick={() => {
                        setAge1(true)
                        setActive('age1')
                      }}
                    >
                      Age I
                    </Button>
                  </Grid>

                  <Grid item md={1.5} sm="auto">
                    <Button
                      variant="outlined"
                      color="secondary"
                      type="submit"
                      sx={{ width: '80px', height: '38px' }}
                      onClick={() => {
                        setAge2(true)
                        setActive('age2')
                      }}
                    >
                      Age II
                    </Button>
                  </Grid>
                  <Grid item md={1.5} sm="auto">
                    <Button
                      variant="outlined"
                      color="secondary"
                      type="submit"
                      sx={{ width: '80px', height: '38px' }}
                      onClick={() => {
                        setAge3(true)
                        setActive('age3')
                      }}
                    >
                      Age III
                    </Button>
                  </Grid>

                  <Grid item md={1.5} sm="auto">
                    <Button
                      variant="outlined"
                      color="secondary"
                      type="submit"
                      sx={{ width: '80px', height: '38px' }}
                      onClick={() => {
                        setAge4(true)
                        setActive('age4')
                      }}
                    >
                      Age IV
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={5}>
                <BuildOrderTable
                  data={buildOrderRowAge1}
                  ageNumber={1}
                  isShown={age1}
                  setBuildOrder={setBuildOrderRowAge1}
                  setCount={setCount1}
                />
                <BuildOrderTable
                  data={buildOrderRowAge2}
                  ageNumber={2}
                  isShown={age2}
                  setBuildOrder={setBuildOrderRowAge2}
                  setCount={setCount2}
                />
                <BuildOrderTable
                  data={buildOrderRowAge3}
                  ageNumber={3}
                  isShown={age3}
                  setBuildOrder={setBuildOrderRowAge3}
                  setCount={setCount3}
                />
                <BuildOrderTable
                  data={buildOrderRowAge4}
                  ageNumber={4}
                  isShown={age4}
                  setBuildOrder={setBuildOrderRowAge4}
                  setCount={setCount4}
                />
              </Box>
            </Grid>

            <Grid item sm={2} xs="auto" ml={0}>
              <TextField
                id="outlined-select-civilization"
                color="secondary"
                select
                label="Select"
                value={civ}
                onChange={handleChange}
                helperText="Please select your civilization"
                sx={{ width: '308px' }}
              >
                {CIVILIZATIONS.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <Grid item sm={2} xs="auto">
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  color="secondary"
                  multiline
                  rows={6}
                  placeholder="Enter Description Here"
                  sx={{ width: '308px', marginTop: '20px' }}
                />
              </Grid>
              <Box sx={{ width: 280, marginTop: '20px' }}>
                <Box sx={{ m: 3 }} />
                <Typography gutterBottom>Difficulty</Typography>
                <Slider
                  aria-label="Difficulty"
                  defaultValue={0}
                  // eslint-disable-next-line react/jsx-no-bind
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={10}
                  color="secondary"
                />
              </Box>
              <Button variant="contained" color="secondary" type="submit">
                Share
              </Button>
            </Grid>
          </Grid>
        </Box>
      </header>
    </div>
  )
}

export default App
