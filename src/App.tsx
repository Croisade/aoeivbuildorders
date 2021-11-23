import React, { useState } from 'react'
import { useFormik } from 'formik'
import concat from 'lodash/concat'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import AppBar from './components/AppBar'
import BuildOrderTable, { BuildOrder } from './components/BuildOrderTable'
import { CIVILIZATIONS } from './constants'
import './App.css'

const App = function App() {
  const [buildOrderRow, setBuildOrderRow] = useState<BuildOrder[]>([])
  const [count, setCount] = useState(1)
  const [civ, setCiv] = React.useState(CIVILIZATIONS[0])

  const initialValues: BuildOrder = {
    count: 1,
    time: '',
    population: '',
    action: '',
    wood: '',
    food: '',
    gold: '',
    stone: '',
    builders: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      setCount(count + 1)
      setBuildOrderRow(concat(buildOrderRow, { ...values, count }))
      resetForm()
      // eslint-disable-next-line no-promise-executor-return
      await new Promise(resolve => setTimeout(resolve, 500))
      alert(JSON.stringify(values, null, 2))
    },
  })

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
        <h2>Construct Your Build Order</h2>
        <Box sx={{ flexGrow: 1, width: '70%' }}>
          <Grid container spacing={0}>
            <Grid item xs={8}>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1 },
                }}
              >
                <form onSubmit={formik.handleSubmit}>
                  <Grid container item spacing={3} xs="auto" sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                      color="secondary"
                      name="time"
                      label="Time"
                      type="search"
                      id="standard-time"
                      variant="standard"
                      onChange={formik.handleChange}
                      value={formik.values.time}
                      sx={{ width: '50px' }}
                    />

                    <TextField
                      color="secondary"
                      name="population"
                      label="Population"
                      type="search"
                      id="standard-time"
                      variant="standard"
                      sx={{ width: '80px' }}
                      onChange={formik.handleChange}
                      value={formik.values.population}
                    />

                    <TextField
                      color="secondary"
                      name="wood"
                      label="Wood"
                      type="search"
                      id="standard-time"
                      sx={{ width: '50px' }}
                      variant="standard"
                      onChange={formik.handleChange}
                      value={formik.values.wood}
                    />
                    <TextField
                      color="secondary"
                      name="food"
                      label="Food"
                      type="search"
                      id="standard-time"
                      sx={{ width: '50px' }}
                      variant="standard"
                      onChange={formik.handleChange}
                      value={formik.values.food}
                    />

                    <TextField
                      color="secondary"
                      name="gold"
                      label="Gold"
                      type="search"
                      id="standard-time"
                      sx={{ width: '50px' }}
                      variant="standard"
                      onChange={formik.handleChange}
                      value={formik.values.gold}
                    />

                    <TextField
                      color="secondary"
                      name="stone"
                      label="Stone"
                      type="search"
                      id="standard-time"
                      sx={{ width: '50px' }}
                      variant="standard"
                      onChange={formik.handleChange}
                      value={formik.values.stone}
                    />

                    <TextField
                      color="secondary"
                      name="builders"
                      label="Builders"
                      type="search"
                      id="standard-time"
                      sx={{ width: '60px' }}
                      variant="standard"
                      onChange={formik.handleChange}
                      value={formik.values.builders}
                    />
                  </Grid>

                  <Grid
                    container
                    item
                    spacing={3}
                    xs="auto"
                    sx={{ marginTop: '1px', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <TextField
                      color="secondary"
                      name="action"
                      label="Action"
                      type="search"
                      id="fullWidth"
                      sx={{ width: '60%', marginTop: '5px' }}
                      variant="standard"
                      onChange={formik.handleChange}
                      value={formik.values.action}
                    />
                  </Grid>
                  <Button variant="contained" color="secondary" type="submit" sx={{ width: '64px', height: '38px' }}>
                    Add
                  </Button>
                </form>
              </Box>
              <Box mt={5}>
                <BuildOrderTable data={buildOrderRow} />
              </Box>
            </Grid>

            <Grid item xs={2}>
              <TextField
                id="outlined-select-currency"
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
              <TextField
                id="outlined-multiline-static"
                label="Description"
                color="secondary"
                multiline
                rows={6}
                placeholder="Enter Description Here"
                sx={{ width: '308px', marginTop: '20px' }}
              />
              <Box sx={{ width: 320, marginTop: '20px' }}>
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
