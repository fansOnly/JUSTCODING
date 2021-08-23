function fib(n) {
    if (n <= 0) {
        return 0;
    }
    let n1 = 1;
    let n2 = 1;
    let sum = 1;
    for(let i = 3; i <= n; i++) {
        [n1, n2] = [n2, sum];
        sum = n1 + n2;
    }
    return sum;
};

console.log(fib(6))

function fib2(n) {
    if (n <=2) return 1
    return fib2(n - 1) + fib2(n - 2)
}

console.log(fib2(7))


function fib3(n, a = 1, b = 1) {
    if (n <= 2) return b
    return fib3(n - 1, b, a + b)
}

console.log(fib3(7))



const object = {
    message: 'Hello, World!',
  
    logMessage() {
      console.log(this.message); // What is logged?
    }
  };
  
object.logMessage()
