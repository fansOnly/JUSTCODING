function lazyMan(name) {
  this.task = []

  this.task.push(() => {
    return new Promise(resolve => {
      console.log('main name ' + name)
      resolve()
    })
  })

  let run = () => {
    let sequence = Promise.resolve()
    for (const fn of this.task) {
      sequence = sequence.then(() => fn())
    }
  }

  setTimeout(run, 0);

  this.eat = (name) => {
    this.task.push(() => {
      return new Promise(resolve => {
        console.log('eat for ' + name)
        resolve();
      })
    })
    return this;
  }

  this.sleep = (delay) => {
    this.task.push(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('sleep for ' + delay / 1000 + 's')
          resolve();
        }, delay);
      })
    })
    return this
  }

  this.sleepFirst = (time) => {
    this.task.unshift(() => {
      return new Promise(resolve => {
        console.log('sleep first for ' + time / 1000 + 's');
        resolve()
      })
    })
    return this;
  }

  return this;
}

lazyMan('Lily').sleep(1000).eat('meat').sleepFirst(2000)