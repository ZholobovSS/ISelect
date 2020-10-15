export default class ISelect {
  constructor(el) {
    this.$el = el
    this.$customSelectWr
    this.$customSelect
    this.$customOptionsWr
    this.options = []
    this.optionSelected
    this.isValid = true
    this.template = ''
    this.isOpen = false
    this.isAnimating = false
    this.animationSpeed = 300
    this.observer
    this.init()
  }

  init() {
    if (this.checkValid()) {
      this.run()
      this.initMutationObserver()
      this.addEventListener(this.$el, 'change', this.changeListener)
    }
  }

  run() {
    this.observer && this.observer.disconnect();
    this.options = [];
    this.optionSelected = undefined;
    [...this.$el.options].forEach((el) => {
      let option = {
        value: el.value,
        text: el.innerText,
        selected: el.selected
      }
      this.options.push(option)
    })
    if (this.options.length) {
      this.detectedSelectedOption()
      this.hideOriginal()
      this.generateTemplate()
      this.insertToPage()
    }
    this.initMutationObserver()
  }

  detectedSelectedOption() {
    if (this.$el.value) {
      this.optionSelected = {
        value: this.$el.value,
        text: this.options.find(el => el.value === this.$el.value).text
      }
    } else {
      const selectedOption = this.options.find(el => el.selected)
      if (!selectedOption) {
        this.options[0].selected = true
        selectedOption = this.options[0]
      }
      this.optionSelected = selectedOption
    }
  }

  changeListener = () => {
    this.run()
  }

  initMutationObserver() {
    const config = { attributes: true, childList: true, subtree: true };
    this.observer = this.observer ? this.observer : new MutationObserver(this.mutationObserverCallback)
    this.observer.observe(this.$el, config)
  }

  mutationObserverCallback = (mutationsList, observer) => {
    if (mutationsList.length) this.run()
  }

  generateTemplate() {
    let template = `
      <div data-customSelectWr class="customSelectWr">
        <div data-customSelect class="customSelect">
          ${this.optionSelected.text}
        </div>
        <div data-optionsContainer class="customSelectOptionsWr">`
    this.options.forEach((opt,i) => {
      template += `<div data-option="${opt.value}" class="customSelectOption ${opt.selected ? 'active' : ''}">${opt.text}</div>`
    })
    template += `</div>`
    this.template = template
  }

  hideOriginal() {
    this.$el.classList.add('hide')
  }

  addEventListener(el, type, func) {
    el.addEventListener(type, func)
  }

  removeEventListener(el, type, func) {
    el.removeEventListener(type, func)
  }

  addGlobalListeners() {
    this.addEventListener(document, 'keydown', this.globalKeypress)
    this.addEventListener(document, 'click', this.globalClick)
  }

  removeGlobalListeners() {
    this.removeEventListener(document, 'click', this.globalClick)
    this.removeEventListener(document, 'keydown', this.globalKeypress) 
  }

  animation() {
    if (!this.isAnimating) {
      if (this.isOpen) {
        this.$customSelect.classList.add('active')
        this.fadeIn()
      } else {
        this.$customSelect.classList.remove('active') 
        this.fadeOut()
      }
    }
  }
  
  clickListener = (e) => {
    this.isOpen = !this.isOpen
    this.animation()
    this.choseOption(e)
    if (this.isOpen) {
      this.addGlobalListeners()
    } else {
      this.removeGlobalListeners()
    }
  }

  globalKeypress = (e) => {
    if (this.isOpen && e.keyCode === 27) {
      this.isOpen = false
        this.animation()
        this.removeGlobalListeners()
    }
  }

  globalClick = (e) => {
    if (!e.target.closest('[data-customSelectWr]') && e.target !== this.$el) {
      if (this.isOpen) {
        this.isOpen = false
        this.animation()
        this.removeGlobalListeners()
      } 
    }
  }

  choseOption(e) {
    if (e.target.dataset.option) {
      this.optionSelected = { value: e.target.dataset.option, text: e.target.innerText }
      this.$customSelect.innerText = this.optionSelected.text
      this.$el.value = this.optionSelected.value
      this.$customOptionsWr.querySelector('.active').classList.remove('active')
      e.target.classList.add('active')
      this.$el.dispatchEvent(new Event('change'))
    }
  }

  fadeIn() {
    this.isAnimating = true
    this.$customOptionsWr.classList.remove('exit-done')
    this.$customOptionsWr.classList.add('enter')
    setTimeout( () => {
      this.$customOptionsWr.classList.add('enter-active')
      setTimeout( () => {
        this.$customOptionsWr.classList.add('enter-done')
        this.$customOptionsWr.classList.remove('enter')
        this.$customOptionsWr.classList.remove('enter-active')
        this.isAnimating = false
      }, this.animationSpeed) 
    } )
  }

  fadeOut() {
    this.isAnimating = true
    this.$customOptionsWr.classList.remove('enter-done')
    this.$customOptionsWr.classList.add('exit')
    setTimeout( () => {
      this.$customOptionsWr.classList.add('exit-active')
      setTimeout( () => {
        this.$customOptionsWr.classList.add('exit-done')
        this.$customOptionsWr.classList.remove('exit')
        this.$customOptionsWr.classList.remove('exit-active')
        this.isAnimating = false
      }, this.animationSpeed) 
    } )
  }

  insertToPage() {
    if (this.$customSelectWr) {
      this.removeGlobalListeners(this.$customSelectWr, 'click', this.clickListener)
      this.$customSelectWr.remove()
    } 
    this.$el.insertAdjacentHTML('afterend', this.template)
    this.$customSelectWr = this.$el.nextElementSibling
    this.$customSelect = this.$customSelectWr.firstElementChild
    this.$customOptionsWr = this.$customSelect.nextElementSibling
    this.addEventListener(this.$customSelectWr, 'click', this.clickListener)
  }

  checkValid() {
    this.isValid = this.$el.tagName === 'SELECT'
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