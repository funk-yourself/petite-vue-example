import 'emoji-picker-element';
import { createApp } from 'petite-vue'

const requireContext = require.context("./components", true, /\.\/.*\.js$/)

const dynamicComponents = requireContext.keys()
  .map(file => requireContext(file))
  .reduce((components, component) => ({ ...components, ...(component.default || component) }), {})

document.addEventListener("DOMContentLoaded", function() {
  createApp(dynamicComponents).mount()
})
