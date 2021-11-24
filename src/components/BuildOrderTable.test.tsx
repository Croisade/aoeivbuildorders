import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { screen } from '@testing-library/dom'
import BuildOrderTable from './BuildOrderTable'

describe('BuildOrderTable', () => {
  it.todo('Should have no rows')
  it('Should add a row to the table', async () => {
    const data = [
      {
        count: 1,
        time: '',
        population: '',
        action: '',
        wood: '',
        food: '',
        gold: '',
        stone: '',
        builders: '',
      },
    ]
    const ageNumber = 2
    const isShown = true
    const setBuildOrder = jest.fn()
    const setCount = a => a + 1

    const { getByText, getAllByRole } = render(
      <BuildOrderTable
        ageNumber={ageNumber}
        isShown={isShown}
        setBuildOrder={setBuildOrder}
        setCount={setCount}
        data={data}
      />,
    )
    expect(getByText('Age 2')).toBeTruthy()
    expect(getAllByRole('cell').length).toEqual(11)
  })
  it.todo('Should delete a row from the table when there is only one row.')
  it.todo('Should delete a row from the table and decrease the count of subsequent rows')
})
