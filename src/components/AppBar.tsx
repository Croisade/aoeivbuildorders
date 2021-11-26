/* eslint-disable react/function-component-definition */
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const ButtonAppBar = function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
            AoEIVBuildOrders.gg
          </Typography>
          <Button color="inherit">Github</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default ButtonAppBar
