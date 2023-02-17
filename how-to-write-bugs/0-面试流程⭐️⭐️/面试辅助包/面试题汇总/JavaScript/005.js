var x = 0,
  y = 1

function fn() {
  x += 2
  fn = function (y) {
    console.log(y + --x)
  }
  console.log(x, y)
}

fn(3)
fn(4)

console.log(x, y)
