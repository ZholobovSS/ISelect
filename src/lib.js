export default class ISelect {
  constructor(el) {
    this.el = el
    this.options = []
    this.optionSelected
    this.isValid = true
    this.template = ''
    this.isOpen = false
    this.customSelectWr
    this.customSelect
    this.customOptionsWr
    this.isAnimating = false
    this.animationSpeed = 300
    this.init()
  }

  init() {
    if (this.checkValid()) {
      [...this.el.options].forEach((el) => this.options.push(el.value))
      this.optionSelected = this.options[0]
      this.hideOriginal()
      this.generateTemplate()
      this.logger(this.template)
      this.insertToPage()
      this.addEventListeners()
    }
  }

  generateTemplate() {
    let template = `
      <div class="customSelectWr">
        <div data-customSelect class="customSelect">
          ${this.optionSelected}
        </div>
        <div data-optionsContainer class="customSelectOptionsWr">`
    this.options.forEach((opt,i) => {
      template += `<div data-option="${opt}" class="customSelectOption ${!i ? 'active' : ''}">${opt}</div>`
    })
    template += `</div>`
    this.template = template
  }

  hideOriginal() {
    this.el.classList.add('hide')
  }

  addEventListeners() {
    this.customSelectWr.addEventListener('click', this.clickListener)
  }

  removeEventListeners() {
    this.customSelectWr.removeEventListener('click', this.clickListener)
  }

  animation() {
    if (!this.isAnimating) {
      if (this.isOpen) {
        this.customSelect.classList.add('active')
        this.fadeIn()
      } else {
        this.customSelect.classList.remove('active') 
        this.fadeOut()
      }
    }
  }
  
  clickListener = (e) => {
    this.isOpen = !this.isOpen
    this.animation()
    this.choseOption(e)
  }

  choseOption(e) {
    if (e.target.dataset.option) {
      this.optionSelected = e.target.dataset.option
      this.customSelect.innerText = this.optionSelected
      this.el.value = this.optionSelected
    }
  }

  fadeIn() {
    this.isAnimating = true
    this.customOptionsWr.classList.remove('exit-done')
    this.customOptionsWr.classList.add('enter')
    setTimeout( () => {
      this.customOptionsWr.classList.add('enter-active')
      setTimeout( () => {
        this.customOptionsWr.classList.add('enter-done')
        this.customOptionsWr.classList.remove('enter')
        this.customOptionsWr.classList.remove('enter-active')
        this.isAnimating = false
      }, this.animationSpeed) 
    } )
  }

  fadeOut() {
    this.isAnimating = true
    this.customOptionsWr.classList.remove('enter-done')
    this.customOptionsWr.classList.add('exit')
    setTimeout( () => {
      this.customOptionsWr.classList.add('exit-active')
      setTimeout( () => {
        this.customOptionsWr.classList.add('exit-done')
        this.customOptionsWr.classList.remove('exit')
        this.customOptionsWr.classList.remove('exit-active')
        this.isAnimating = false
      }, this.animationSpeed) 
    } )
  }

  insertToPage() {
    this.el.insertAdjacentHTML('afterend', this.template)
    this.customSelectWr = this.el.nextElementSibling
    this.customSelect = this.customSelectWr.firstElementChild
    this.customOptionsWr = this.customSelect.nextElementSibling
  }

  checkValid() {
    this.isValid = this.el.tagName === 'SELECT'
    if (!this.isValid) this.showError()
    return this.isValid
  }

  showError() {
    console.log('AHTUNG: el is not select tag')
  }

  logger(info) {
    console.log('Logger: ', info)
  }
}
