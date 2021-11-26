import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Builds from './routes/builds'
import './index.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#333337',
    },
    secondary: {
      main: '#2f8bfd',
    },
  },
})

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="builds/:id" element={<Builds />} />
        </Routes>
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
