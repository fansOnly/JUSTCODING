function* counter(value) {
  let step;

  while (true) {
    step = yield value++;
    console.log('step: ', step);
    if (step) {
      value += step;
    }
  }
}

const generatorFunc = counter(0);
console.log(generatorFunc.next().value); // 0
console.log(generatorFunc.next().value); // 1
console.log(generatorFunc.next().value); // 2
console.log(generatorFunc.next().value); // 3
console.log(generatorFunc.next(10).value); // 14
console.log(generatorFunc.next().value); // 15
console.log(generatorFunc.next(10).value); // 26

function* step() {
  yield 1
  x = yield 2
  yield x
  yield 3
}

const genStep = step()
console.log(genStep.next('1').value);
console.log(genStep.next('x').value);
console.log(genStep.next('y').value);
console.log(genStep.next().value);



function* gen() {
  while(true) {
    var value = yield null;
    console.log(value);
  }
}

var g = gen();
console.log(g.next(1).value);
console.log(g.next(2).value);
