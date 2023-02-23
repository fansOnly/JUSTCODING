function Ofo() { }

function Bike() {
  this.name = 'mybike'
}

var myBike = new Ofo()

Ofo.prototype = new Bike()

console.log(Ofo)
console.log(myBike)

console.log(myBike.name)

var yourBike = new Bike()

console.log(yourBike.name)
