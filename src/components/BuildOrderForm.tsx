import React from 'react'
import { Grid, TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import concat from 'lodash/concat'
import { BuildOrder } from './BuildOrderTable'

const BuildOrderForm = function formikForm({
  getActiveStatusFromAll,
  count,
  setCount,
  getSetActiveBuildOrderAge,
  getActiveBuildOrderAge,
}: {
  getActiveStatusFromAll: () => boolean
  count: number
  setCount: (value: any) => any
  getSetActiveBuildOrderAge: () => (buildOrder: any) => any
  getActiveBuildOrderAge: () => BuildOrder[]
}) {
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
      getSetActiveBuildOrderAge()(concat(getActiveBuildOrderAge(), [{ ...values, ...{ count } }]))
      resetForm()
    },
  })

  return (
    <div>
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
              label="Pop."
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

          <Grid item sm={8} xs={12}>
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

          <Grid item sm={12} xs={12}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={!getActiveStatusFromAll()}
              sx={{ width: '64px', height: '38px' }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default BuildOrderForm
