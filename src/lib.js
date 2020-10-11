export default class ISelect {
  constructor(el) {
    this.el = el
    this.options = []
    this.isValid = true
    this.init()
  }

  init() {
    if (this.checkValid()) {
      [...this.el.options].forEach((el) => this.options.push(el.value))
    }
  }

  checkValid() {
    this.isValid = this.el.tagName === 'SELECT'
    if (!this.isValid) this.showError()
    return this.isValid
  }

  showError() {
    console.log('AHTUNG')
  }

  showOptions() {
    console.log(this.options)
  }
}
