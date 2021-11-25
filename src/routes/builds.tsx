import React from 'react'
import { useLocation } from 'react-router-dom'

const Build = function () {
  const location = useLocation()
  return (
    <div>
      {' '}
      Jamal
      {console.log(location)}
    </div>
  )
}

export default Build
