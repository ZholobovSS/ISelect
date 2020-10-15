parcelRequire=function(e){var r="function"==typeof parcelRequire&&parcelRequire,n="function"==typeof require&&require,i={};function u(e,u){if(e in i)return i[e];var t="function"==typeof parcelRequire&&parcelRequire;if(!u&&t)return t(e,!0);if(r)return r(e,!0);if(n&&"string"==typeof e)return n(e);var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}return u.register=function(e,r){i[e]=r},i=e(u),u.modules=i,u}(function (require) {var a={};function f(e){throw new Error("\""+e+"\" is read-only")}function g(e){return l(e)||k(e)||j(e)||h()}function h(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function j(e,t){if(e){if("string"==typeof e)return c(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?c(e,t):void 0}}function k(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function l(e){if(Array.isArray(e))return c(e)}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,s=new Array(t);i<t;i++)s[i]=e[i];return s}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function n(e,t,i){return t&&d(e.prototype,t),i&&d(e,i),e}function b(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var o=function(){function e(t){var i=this;m(this,e),b(this,"mutationObserverCallback",function(e,t){e.length&&i.run()}),b(this,"clickListener",function(e){i.isOpen=!i.isOpen,i.animation(),i.choseOption(e),i.isOpen?i.addGlobalListeners():i.removeGlobalListeners()}),b(this,"globalKeypress",function(e){i.isOpen&&27===e.keyCode&&(i.isOpen=!1,i.animation(),i.removeGlobalListeners())}),b(this,"globalClick",function(e){e.target.closest("[data-customSelectWr]")||e.target===i.$el||i.isOpen&&(i.isOpen=!1,i.animation(),i.removeGlobalListeners())}),this.$el=t,this.$customSelectWr,this.$customSelect,this.$customOptionsWr,this.options=[],this.optionSelected,this.isValid=!0,this.template="",this.isOpen=!1,this.isAnimating=!1,this.animationSpeed=300,this.observer,this.init()}return n(e,[{key:"init",value:function(){this.checkValid()&&(this.run(),this.initMutationObserver())}},{key:"run",value:function(){var e=this;if(this.observer&&this.observer.disconnect(),this.options=[],this.optionSelected=void 0,g(this.$el.options).forEach(function(t){var i={value:t.value,text:t.innerText,selected:t.selected};e.options.push(i)}),this.options.length){var t=this.options.find(function(e){return e.selected});t||(this.options[0].selected=!0,f("selectedOption"),t=this.options[0]),this.optionSelected=t,this.hideOriginal(),this.generateTemplate(),this.insertToPage()}this.initMutationObserver()}},{key:"initMutationObserver",value:function(){this.observer=this.observer?this.observer:new MutationObserver(this.mutationObserverCallback),this.observer.observe(this.$el,{attributes:!0,childList:!0,subtree:!0})}},{key:"generateTemplate",value:function(){var e="\n      <div data-customSelectWr class=\"customSelectWr\">\n        <div data-customSelect class=\"customSelect\">\n          ".concat(this.optionSelected.text,"\n        </div>\n        <div data-optionsContainer class=\"customSelectOptionsWr\">");this.options.forEach(function(t,i){e+="<div data-option=\"".concat(t.value,"\" class=\"customSelectOption ").concat(t.selected?"active":"","\">").concat(t.text,"</div>")}),e+="</div>",this.template=e}},{key:"hideOriginal",value:function(){this.$el.classList.add("hide")}},{key:"addEventListener",value:function(e,t,i){e.addEventListener(t,i)}},{key:"removeEventListener",value:function(e,t,i){e.removeEventListener(t,i)}},{key:"addGlobalListeners",value:function(){this.addEventListener(document,"keydown",this.globalKeypress),this.addEventListener(document,"click",this.globalClick)}},{key:"removeGlobalListeners",value:function(){this.removeEventListener(document,"click",this.globalClick),this.removeEventListener(document,"keydown",this.globalKeypress)}},{key:"animation",value:function(){this.isAnimating||(this.isOpen?(this.$customSelect.classList.add("active"),this.fadeIn()):(this.$customSelect.classList.remove("active"),this.fadeOut()))}},{key:"choseOption",value:function(e){e.target.dataset.option&&(this.optionSelected={value:e.target.dataset.option,text:e.target.innerText},this.$customSelect.innerText=this.optionSelected.text,this.$el.value=this.optionSelected.value,this.$customOptionsWr.querySelector(".active").classList.remove("active"),e.target.classList.add("active"),this.$el.dispatchEvent(new Event("change")))}},{key:"fadeIn",value:function(){var e=this;this.isAnimating=!0,this.$customOptionsWr.classList.remove("exit-done"),this.$customOptionsWr.classList.add("enter"),setTimeout(function(){e.$customOptionsWr.classList.add("enter-active"),setTimeout(function(){e.$customOptionsWr.classList.add("enter-done"),e.$customOptionsWr.classList.remove("enter"),e.$customOptionsWr.classList.remove("enter-active"),e.isAnimating=!1},e.animationSpeed)})}},{key:"fadeOut",value:function(){var e=this;this.isAnimating=!0,this.$customOptionsWr.classList.remove("enter-done"),this.$customOptionsWr.classList.add("exit"),setTimeout(function(){e.$customOptionsWr.classList.add("exit-active"),setTimeout(function(){e.$customOptionsWr.classList.add("exit-done"),e.$customOptionsWr.classList.remove("exit"),e.$customOptionsWr.classList.remove("exit-active"),e.isAnimating=!1},e.animationSpeed)})}},{key:"insertToPage",value:function(){this.$customSelectWr&&(this.removeGlobalListeners(this.$customSelectWr,"click",this.clickListener),this.$customSelectWr.remove()),this.$el.insertAdjacentHTML("afterend",this.template),this.$customSelectWr=this.$el.nextElementSibling,this.$customSelect=this.$customSelectWr.firstElementChild,this.$customOptionsWr=this.$customSelect.nextElementSibling,this.addEventListener(this.$customSelectWr,"click",this.clickListener)}},{key:"checkValid",value:function(){return this.isValid="SELECT"===this.$el.tagName,this.isValid||this.showError(),this.isValid}},{key:"showError",value:function(){console.log("AHTUNG: el is not select tag")}},{key:"logger",value:function(e){console.log("Logger: ",e)}}]),e}();a.default=o;if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=a}else if(typeof define==="function"&&define.amd){define(function(){return a})}a.__esModule=true;return{"oHGM":a};});