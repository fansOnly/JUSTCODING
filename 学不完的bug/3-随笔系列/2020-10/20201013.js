var fn
fn = function() {
    return 1
}

function fn() {
    return 2
}

console.log(fn()) // 1



// ============================================================================================================


var fn = (function a() {
    a = 1
    console.log(a) // Function a
})
fn()

var fn2 = (function a() {
    var a = 1
    console.log(a) // 1
})
fn2()


// ============================================================================================================

function F1() {
    return 2
}

function say() {
    return 10
}

function f1() {
    say = function() {
        return 1
    }
    return this
}

f1.say = function() {
    return -1
}

f1.prototype.say = function() {
    return 22
}

console.log(new f1().say()) // 22
console.log(f1.say()) // -1
console.log(new f1.say()) // {}
console.log(new F1()) // F1 {}


// ============================================================================================================

var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();



// ==========================================================================================================

(function autorun(p) {
    let x = 1;
    setTimeout(function log() {
        console.log(x); // 1
        console.log(p); // 10
    }, 1000);
})(10);


{
    let x = 1;
    setTimeout(function log() {
        console.log(x); // 1
    }, 1000);
}


// ✨ 闭包的外部作用域在其定义的时候已经决定了，而不是在执行的时候
(function autorun() {
    let x = 1;
    function log() {
        console.log(x); // 1
    };

    function run(fn) {
        let x = 100;
        fn();
    }

    run(log);
})();


(function autorun() {
    let x = 1;
    function log() {
        console.log(x); // 100
    };

    function run(fn) {
        x = 100;
        fn();
    }

    run(log);
})();


// i++ 每次循环的最后都要执行的表达式。执行时机是在下一次 condition 的计算之前。通常被用于更新或者递增计数器变量
(function () {
    for (var i = 0; i < 3; i++) {
        setTimeout(() => {
            console.log(i) // 3, 3, 3
        }, 1000);
    }
})();

(function () {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            console.log(i) // 0, 1, 2
        }, 1000);
    }
})();

(function () {
    let i = 0
    for (; i < 3; i++) {
        setTimeout(() => {
            console.log(i) // 3, 3, 3
        }, 1000);
    }
})();



function TodoStore() {
    let todos = [];

    function add(todo) {
        todos.push(todo);
    }
    function get() {
        return todos.filter(isPriorityTodo).map(toTodoViewModel);
    }

    function isPriorityTodo(todo) {
        return todo.type === "RE" && !todo.completed;
    }

    function toTodoViewModel(todo) {
        return { id: todo.id, title: todo.title };
    }

    return Object.freeze({
        add,
        get
    });
}

var todo = new TodoStore()
todo.add({ id: 1, title: 'first', type: 'RE', completed: false})

console.log(todo.get(1))
