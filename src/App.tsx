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
        <Typography variant="h3" component="h3" mb={5} mt={2}>
          Construct Your Build Order
        </Typography>
        <Box sx={{ flexGrow: 1, width: '70%' }}>
          <Grid container spacing={5}>
            <Grid item sm={8} xs="auto">
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1 },
                }}
              >
                <form onSubmit={formik.handleSubmit}>
                  <Grid container item spacing={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item sm={1.14} xs={6}>
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
                    </Grid>

                    <Grid item md={1.14} xs={6}>
                      <TextField
                        color="secondary"
                        name="population"
                        label="Pop.`"
                        type="search"
                        id="standard-population"
                        variant="standard"
                        sx={{ width: '50px' }}
                        onChange={formik.handleChange}
                        value={formik.values.population}
                      />
                    </Grid>

                    <Grid item sm={1.14} xs={6}>
                      <TextField
                        color="secondary"
                        name="wood"
                        label="Wood"
                        type="search"
                        id="standard-wood"
                        sx={{ width: '50px' }}
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.wood}
                      />
                    </Grid>

                    <Grid item sm={1.14} xs="auto">
                      <TextField
                        color="secondary"
                        name="food"
                        label="Food"
                        type="search"
                        id="standard-food"
                        sx={{ width: '50px' }}
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.food}
                      />
                    </Grid>

                    <Grid item sm={1.14} xs="auto">
                      <TextField
                        color="secondary"
                        name="gold"
                        label="Gold"
                        type="search"
                        id="standard-gold"
                        sx={{ width: '50px' }}
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.gold}
                      />
                    </Grid>

                    <Grid item sm={1.14} xs="auto">
                      <TextField
                        color="secondary"
                        name="stone"
                        label="Stone"
                        type="search"
                        id="standard-stone"
                        sx={{ width: '50px' }}
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.stone}
                      />
                    </Grid>

                    <Grid item sm={1.14} xs="auto">
                      <TextField
                        color="secondary"
                        name="builders"
                        label="Builders"
                        type="search"
                        id="standard-builders"
                        sx={{ width: '60px' }}
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.builders}
                      />
                    </Grid>

                    <Grid item sm={8} xs="auto">
                      <TextField
                        color="secondary"
                        name="action"
                        label="Action"
                        type="search"
                        id="fullWidth"
                        sx={{ width: '80%', marginTop: '5px' }}
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.action}
                      />
                    </Grid>
                  </Grid>
                  <Button variant="contained" color="secondary" type="submit" sx={{ width: '64px', height: '38px' }}>
                    Add
                  </Button>
                </form>
              </Box>
              <Box mt={5}>
                <BuildOrderTable data={buildOrderRow} ageNumber={1} isShown />
                <BuildOrderTable data={buildOrderRow} ageNumber={2} isShown={false} />
                <BuildOrderTable data={buildOrderRow} ageNumber={3} isShown={false} />
                <BuildOrderTable data={buildOrderRow} ageNumber={4} isShown={false} />
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
