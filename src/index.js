import ISelect from './lib'

const selectEl = document.querySelector('[data-select]')
const newISelect = new ISelect(selectEl)
document.forms.example.addEventListener('submit', (e) => {
  e.preventDefault()
})

selectEl.addEventListener('change', (e) => {
  console.log('New select value: ', e.target.value)
})
