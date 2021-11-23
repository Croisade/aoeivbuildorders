/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState}  from 'react';
import { Formik, Field, Form } from 'formik'
import concat from 'lodash/concat'
import Button from '@mui/material/Button'
import AppBar from './components/AppBar'
import BuildOrderTable, { BuildOrder } from './components/BuildOrderTable'
import './App.css'


const App = function () {
  const [buildOrderRow, setBuildOrderRow] = useState<BuildOrder[]>([])
  const [count, setCount]= useState(0)
  const initialValues: BuildOrder = {
    count: 0,
    time: '',
    population: '',
    action: '',
    wood: '',
    food: '',
    gold: '',
    stone: '',
    builders: '',
  }
  return (
    <div className="App">
      <AppBar />
      <header className="App-header">
        <h2>Construct Your Build Order</h2>
        <Formik
          initialValues ={initialValues}
          onSubmit={async values => {
            setCount(count + 1)
            setBuildOrderRow(concat(buildOrderRow, {...values, count}))
            // await new Promise(resolve => setTimeout(resolve, 500))
            // alert(JSON.stringify(values, null, 2))
          }}
        >
          <Form>
            <label htmlFor="time">Time</label>
            <Field name="time" type="text" />

            <label htmlFor="population">Population</label>
            <Field name="population" type="text" />

            <label htmlFor="action">Action</label>
            <Field name="action" type="text" />

            <label htmlFor="wood">Wood</label>
            <Field name="wood" type="text" />

            <label htmlFor="food">Food</label>
            <Field name="food" type="text" />

            <label htmlFor="gold">Gold</label>
            <Field name="gold" type="text" />

            <label htmlFor="stone">Stone</label>
            <Field name="stone" type="text" />

            <label htmlFor="builders">Builders</label>
            <Field name="builders" type="text" />

            <Button variant="contained" type="submit">
              Add
            </Button>
          </Form>
        </Formik>

        <BuildOrderTable data={buildOrderRow} />
      </header>
    </div>
  )
}

export default App
