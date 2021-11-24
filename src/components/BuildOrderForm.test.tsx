import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import BuildOrderForm from './BuildOrderForm'

describe('Submit', () => {
  describe('with valid inputs', () => {
    it('submits the form', async () => {
      const getActiveStatusFromAll = jest.fn()
      const count = 0
      const setCount = () => count + 1
      const getSetActiveBuildOrderAge = () => () => []
      const getActiveBuildOrderAge = jest.fn()
      const { getByLabelText, getByRole } = render(
        <BuildOrderForm
          getActiveStatusFromAll={getActiveStatusFromAll}
          count={count}
          setCount={setCount}
          getSetActiveBuildOrderAge={getSetActiveBuildOrderAge}
          getActiveBuildOrderAge={getActiveBuildOrderAge}
        />,
      )

      await act(async () => {
        fireEvent.change(getByLabelText('Time'), { target: { value: '1:00' } })
      })

      await act(async () => {
        fireEvent.click(getByRole('button'))
      })

      expect(getActiveStatusFromAll).toHaveBeenCalled()
    })
  })
})
