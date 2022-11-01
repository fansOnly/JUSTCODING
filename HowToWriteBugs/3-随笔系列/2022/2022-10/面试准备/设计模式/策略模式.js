const strategies = {
  isEmpty(value, msg) {
    if (!value) {
      return msg
    }
  },
  isNumber(value, msg) {
    if (!/^\d+$/.test(value)) {
      return msg
    }
  }
}

class Validator {
  constructor() {
    this.validates = []
    this.errors = []
  }
  add(value, rules = []) {
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i]
      this.validates.push(() => {
        const strategyFn = strategies[rule.name]
        const result = strategyFn(value, rule.message)
        if (result) {
          this.errors.push(result)
        }
      })
    }
  }
  validate() {
    for (let i = 0; i < this.validates.length; i++) {
      this.validates[i]()
    }
    return this.errors
  }
}

function validateForm(data, rules) {
  const formValidate = new Validator()
  formValidate.add(data, rules)
  return formValidate.validate()
}

const data = {
  name: 'lily',
  age: 20
}
const valid = validateForm(data.name, [
  {
    name: 'isEmpty', message: '不能为空'
  },
  {
    name: 'isNumber', message: '数字'
  }
])
console.log(valid);
