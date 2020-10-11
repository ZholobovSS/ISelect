import ISelect from './lib'

const selectEl = document.querySelector('[data-select]')
const newISelect = new ISelect(selectEl)
newISelect.showOptions()
