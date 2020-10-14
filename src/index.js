import ISelect from './lib'

const selectEl = document.querySelector('[data-select]')
const newISelect = new ISelect(selectEl)
document.forms.example.addEventListener('submit', (e) => {
  e.preventDefault()
})
