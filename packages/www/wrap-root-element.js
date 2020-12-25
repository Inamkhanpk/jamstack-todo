const React = require('react')
const { ThemeProvider } = require('theme-ui')
const {light} = require('@theme-ui/presets')
module.exports = ({ element }) => (
  <ThemeProvider theme={light}>{element}</ThemeProvider>
)