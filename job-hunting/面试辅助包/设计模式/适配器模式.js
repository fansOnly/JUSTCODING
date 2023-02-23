class Electricity {
  constructor(type) {
    this.type = type
  }

  charge() {
    if (this.type === 'usb') {
      this.chargeUsb()
    } else if (this.type === 'type-c') {
      this.chargeTypeC()
    } else {
      console.log(`${this.type} not supported.`)
    }
  }

  chargeUsb() {
    console.log('usb charging...')
  }
  chargeTypeC() {
    console.log('type-c charging...')
  }
}


const usb = new Electricity('usb')

usb.charge()

const typeC = new Electricity('type-c')
typeC.charge()
