class Car {
  constructor(name, color) {
    this.name = name
    this.color = color
  }
}

class Factory {
  static create(type) {
    switch (type) {
      case 'car':
        return new Car('汽车', '白色')
        break
      case 'bus':
        return new Car('公交', '蓝色')
        break
      default:
        return new Car('汽车', '黑色')
    }
  }
}

const c1 = Factory.create('car')
console.log('c1: ', c1);
const c2 = Factory.create('bus')
console.log('c2: ', c2);
