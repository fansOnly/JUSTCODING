<!-- Set -->
# 一、关于Set

### 1、Set 的定义

- 对象可以存储任意类型的值，Set 中的元素是唯一的。

### 2、Set 对象内部采用 SameValueZero <sup>[[1]](#a)</sup> 算法对元素进行比较去重

<!-- [^1]:SameValueZero：+0 与 -0 不相等；NaN 与 NaN 相等；其余同 ===; [🔗](https://www.ecma-international.org/ecma-262/6.0/#sec-samevaluezero) -->

### 3、Set 属性

- Set.prototype：Set 构造器的原型。
- Set.length：Set 对象的长度。
- Set[@@species]：构造函数用来创建派生对象。

### 4、Set 实例：通过 new Set([iterable]) 创建一个 Set 对象

- 如果传入一个可迭代对象，所有元素将无重复的传入 Set 中，如果传入 null 或者不传参数，新的 Set 默认为空。

### 5、Set 实例的属性

- Set.prototype.constructor：实例的构造函数，默认指向 Set。
- Set.prototype.size：返回 Set 对象的值的个数。

### 6、Set 实例的方法

> 四种操作方法

1. Set.prototype.add(value)：往 Set 对象尾部添加元素，返回 Set 对象。

    ```javascript
    let set1 = new Set();

    set1.add(1).add('a').add([2]);

    console.log(set1);   // Set { 1, 'a', [ 2 ] }
    ```

2. Set.prototype.delete(value)：移除指定的元素，Set 对象中能找到该元素，返回 true， 否则返回 false。
   
   ```javascript
   let set1 = new Set(['1', 'a', [2]]);

   set1.delete(1);  // false

   console.log(set1); // Set { '1', 'a', [ 2 ] }

   set1.delete('1');   // true

   console.log(set1);  // Set { 'a', [ 2 ] }
   ```

3. Set.prototype.has(value)：判断值是否存在于 Set 对象中，返回布尔值。
   
   ```javascript
   let set1 = new Set(['1', 'a', [2]]);

   console.log(set1.has('a')); // true
   ```

4. Set.prototype.clear()： 移除 Set 对象内的所有元素。

   ```javascript
   let set1 = new Set(['1', 'a', [2]]);

   set1.clear();

   console.log(set1);  // Set {}
   ```

> 四种遍历方法

1. Set.prototype.keys()：返回一个新的迭代器对象，该对象包 Set 对象中按插入顺序排列的所有元素的值。

    ```javascript
    let set1 = new Set([1, 'a', [2], {x: 3}]);

    for (let item of set1.keys()) {
        console.log(item);  // 1, 'a', [2], {x: 3}
    }
    ```

2. Set.prototype.values()：同 keys() 方法。

3. Set.prototype.entries(): 返回一个新的迭代器对象，该对象包含 Set 对象中按插入顺序排列的所有元素的值的 [value, value] 数组。

    ```javascript
    let set1 = new Set([1, 'a', [2], {x: 3}]);

    for (let item of set1.entries()) {
        console.log(item);  // [1, 1], ['a', 'a'], [[2], [2]], [{x: 3}, {x: 3}]
    }
    ```

4. Set.prototype.forEach(callbackFn[, thisArg])：为 Set 对象中的每个值执行一次 callbackFn()，如果指定了 thisArg，回调中的 this 会是这个值。

- 不能通过 forEach 循环遍历修改 Set 对象。

    ```javascript
    let set1 = new Set([1, 2]);

    set1.forEach(function(value, key) {
        console.log(value + '-' + key); // 1-1, 2-2
    }
    ```

### 7、Set 应用实战

1. Set 转换数组

    ```javascript
    let set1 = new Set([1, 2, 'a']);

    let arr = [...set1];

    let arr = Array.from(set1);

    console.log(arr); // [1, 2, 'a']
    ```

2. 数组去重(unique)

    ```javascript
    let arr = [1, 2, 3, 1, 4, 5];

    let unique = [...new Set(arr)];

    console.log(unique); // [1, 2, 3, 4, 5]
    ```

3. 实现并集(union)、交集(intersect)、差集(difference)

    ```javascript
    let set1 = new Set([1, 2, 3, 4, 5]);

    let set2 = new Set([3, 6, 7, 8, 5]);

    let union = new Set([...set1, ...set2]);
    console.log(union); // Set {1, 2, 3, 4, 5, 6, 7, 8}

    let intersect = new Set([...set1].filter(x => set2.has(x)));
    console.log(intersect); // Set {3, 5}

    let difference = new Set([...set1].filter(x => !set2.has(x)));
    console.log(difference); // Set {1, 2, 4}
    ```

4. 变更 Set 结构：将 Set 变更为数组，对数组进行操作后再转换为 Set 结构

- 例：实现 Set 中的值+1

    ```javascript
    let set1 = new Set([1, 2, 3, 4, 5]);

    let res = new Set([...set1].map(x => ++x));

    let res = new Set(Array.from(set1, x => ++x));

    console.log(res); // Set {2, 3, 4, 5, 6}
    ```

&emsp;

<!-- WeakSet -->
# 二、WeakSet

### 1、WeakSet 定义

- WeakSet 对象是一些对象的值的集合，每个对象只能出现一次。

### 2、WeakSet 与 Set 的区别

- WeakSet 只能存放对象引用，不能存放值，即成员只能是对象。
- WeakSet 中的值都是弱引用，如果没有其他的对象或者属性引用这个值，它会被垃圾回收机制回收掉。因此，Weakset 无法被枚举。

### 3、WeakSet 属性

- WeakSet.prototype： WeakSet 对象的原型
- WeakSet.length： WeakSet 对象的长度
- WeakSet.prototype [ @@toStringTag ]：{ [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }

### 4、WeakSet 实例：通过 new WeakSet([iterable]) 创建一个 WeakSet 对象

- 如果传入一个可迭代对象，所有元素将无重复的传入 WeakSet 中，如果传入 null 或者不传参数，新的 WeakSet 默认为空。

### 5、WeakSet 实例的属性

- WeakSet.prototype.constructor

### 6、WeakSet 实例的方法

1. WeakSet.has(value)：在该 WeakSet 对象中添加一个新元素 value

    ```javascript
    let weakset = new WeakSet();

    weakset.add(window);

    console.log(weakset); // WeakSet { window 对象 }
    ```

2. WeakSet.delete(value)：删除 WeakSet 对象中的 value 值

    ```javascript
    let weakset = new WeakSet([document.body, window]);

    weakset.delete(document.body);

    console.log(weakset); // WeakSet { window 对象 }
    ```

3. WeakSet.has(value)：判断 value 是否存在于 WeakSet 对象中

    ```javascript
    let weakset = new WeakSet([window]);

    console.log(weakset.has(window)); // true

    weakset.delete(window);

    console.log(weakset.has(window)); // false
    ```

### 7、WeakSet 应用

- 存储 DOM 节点，避免内存泄漏。

&emsp;

<!-- Map -->
# 三、Map

### 1、Map 的定义

- Map 对象保存键值对，任意值（对象或者原始值）都可以作为键或者值。
- Map 中的键值是唯一的。

    ```javascript
    let map = new Map();

    map.set('x', 1);
    console.log(map); // Map { 'x' => 1 }

    map.set('x', 2);
    console.log(map); // Map { 'x' => 2 }
    ```

### 2、Map 的语法

- new Map([iterable])：iterable 可以是一个数组或者其他 iterable 对象，其元素为键值对(['a', 1], ['b', 2])。
- null 会被当作 undefined 来处理。
- Map 内部键的比较基于 SameValueZero <sup>[a](#a)</sup>。

### 3、Map 与 Object 的对比

- Object 的键只能是字符串或者 Symbols，Map 的键可以是任意值。
- Map 中的键是有序的，按照插入顺序遍历。
- Map.prototype.size 可以直接获取 Map 对象的键值对的个数。
- Map 可以直接进行迭代，Object 需要先获取键数组才能迭代。
- Map 在处理频繁增删键值对的场景下具有一定的性能优势。

### 4、Map 的属性

- Map.length: 0
- Map.prototype
- get Map[@@species]：创建派生对象

### 5、Map 实例的属性

- Map.prototype.constructor
- Map.prototype.size: 返回 Map 键值对的数量

    ```javascript
    let map = new Map([['a', 1], [2]]);

    console.log(map); // Map { 'a' => 1, 2 => undefined }

    console.log(map.size); // 2
    ```

### 6、Map 实例的方法

> 5个操作方法

1. Map.prototype.set(key, value)
   
   ```javascript
   let map = new Map();
   console.log(map); // Map {}

   map.set();
   console.log(map); // Map { undefined => undefined }

   map.set(null);
   console.log(map); // Map { undefined => undefined, null => undefined }

   map.set(undefined, 1);
   console.log(map); // Map { undefined => 1, null => undefined }
   ```

2. Map.prototype.get(key)

    ```javascript
    let map = new Map();

    console.log(map.get('a')); // undefined
    console.log(map.get()); // undefined

    map.set('a', 1);
    console.log(map.get('a')); // 1
    ```

3. Map.prototype.has(key)

    ```javascript
    let map = new Map();

    console.log(map.has('a')); // false
    console.log(map.has()); // false

    map.set('a', 1);
    console.log(map.has('a')); // true
    ```

4. Map.prototype.delete(key)

    ```javascript
    let map = new Map();

    console.log(map.delete('a')); // false
    console.log(map.delete()); // false

    map.set('a', 1);
    console.log(map.delete('a')); // true
    console.log(map); // Map {}
    ```

5. Map.prototype.clear()

    ```javascript
    let map = new Map();

    map.set('a', 1);
    console.log(map.clear()); // undefined
    console.log(map); // Map {}
    ```

> 4个遍历方法

1. Map.prototype.keys()：返回 Interable 对象，按照插入顺序包含了每个元素的键。

    ```javascript
    let map = new Map([['a', 1], ['b', 2]]);

    for (let key of map.keys()) {
        console.log(key); // a, b
    }
    ```

2. Map.prototype.values()：返回 Iterable 对象，按照插入顺序包含了每个元素的值。

    ```javascript
    let map = new Map([['a', 1], ['b', 2]]);

    for (let value of map.values()) {
        console.log(value); // 1, 2
    }
    ```
    
3. Map.prototype.entries()：返回 Iterable 对象，按照插入顺序包含了每个元素的 [key, value] 数组。
   
    ```javascript
    let map = new Map([['a', 1], ['b', 2]]);

    for (let item of map.entries()) {
        console.log(item); // ['a', 1], ['b', 2]
    }

    for (let [key, value] of map.entries()) {
        console.log(key + ' - ' + value); // a - 1, b - 2
    }
    ```
    
4. Map.prototype.forEach(callbackFn[, thisArg])：按照插入顺序为每个元素的键值对执行一次 callbackFn 函数，如果指定了 thisArg，回调函数的 this 会是这个值。

    ```javascript
    let map = new Map([['a', 1], 'b', 2]);

    map.forEach((value, key) => {
        console.log(key + ' - ' + value); // a - 1, b - 2
    })
    ```

### 7、Map 与其他类型的转换

1. Map 转数组

    ```javascript
    let map = new Map([['a', 1], ['b', 2]]);

    let arr = [...map];
    console.log(arr); // [['a', 1], ['b', 2]]
    ```

2. 数组转Map
   
    ```javascript
    let arr = [['a', 1], ['b', 2]];

    let map = new Map(arr);
    console.log(map); // Map { 'a' => 1, 'b' => 2 }
    ```

3. Map 转对象

    ```javascript
    let map = new Map([['a', 1], ['b', 2]]);

    const mapToObj = map => {
        let obj = {};
        for (let [key, value] of map) {
            obj[key] = value;
        }
        return obj;
    }

    let obj = mapToObj(map);
    console.log(obj); // { a: 1, b: 2 }
    ```

4. 对象转 Map

    ```javascript
    let obj = {
        a: 1,
        b: 2
    }

    const objToMap = obj => {
        let map = new Map();
        for (let item in obj) {
            map.set(item, obj[item]);
        }
        return map;
    }

    let map = objToMap(obj);
    console.log(map); // Map { 'a' => 1, 'b' => 2 }
    ```

5. Map 转 JSON

   - Map 转换 JSON 字符串

        ```javascript
        let map = new Map([['a', 1], ['b', 2]]);

        let json = JSON.stringify(mapToObj(map));

        console.log(json); // '{"a": 1, "b": 2}'
        ```

   - Map 转换 JSON 数组

        ```javascript
        let map = new Map([['a', 1], [{x:3}, 2]]);

        let json = JSON.stringify([...map]);

        console.log(json); // '[["a", 1], [{"x":3}, 2]]'
        ```
  
6. JSON 转 Map

    - JSON 字符串转 Map

        ```javascript
        let json = '{"a": 1, "b": 2}';

        let map = objToMap(JSON.parse(json));

        console.log(map); // Map { 'a' => 1, 'b' => 2 }
        ```

    - JSON 数组转 Map

        ```javascript
        let json = '[["a", 1], [{"x":3}, 2]]';

        let map = new Map(JSON.parse(json));

        console.log(map); // Map { 'a' => 1, { x: 3 } => 2 }
        ```

&emsp;

<!-- WeakMap -->
# 4、WeakMap

### 1、WeakMap 的定义

- WeakMap 是键值对的集合，它的键是弱引用的。
- WeakMap 的键只能是对象。
- WeakMap 不能被遍历。

### 2、WeakMap 的语法

- new WeakMap([Iterable])：Iterable 是一个数组（二元数组）或者其他可迭代的且其元素是键值对的对象。每个键值对会被加到新的 WeakMap 里。null 会被当做 undefined。

### 3、WeakMap 的属性

- WeakMap.length: 0
- WeakMap.prototype
  
### 4、WeakMap 的实例属性

- WeakMap.prototype.constructor

### 5、WeakMap 的实例方法

- WeakMap.prototype.add(key, value)
- WeakMap.prototype.has(key)
- WeakMap.prototype.get(key)
- WeakMap.prototype.delete(key)

    ```javascript
    let weakmap = new WeakMap();

    let key = {
        a: 1
    }

    let key2 = {
        a: 1
    }

    let key3 = key;

    weakmap.set(key, 2);

    console.log(weakmap.get(key), weakmap.get(key2), weakmap.get(key3)); // 2 undefined 2

    console.log(weakmap.has(key), weakmap.has(key2), weakmap.has(key3)); // true false true

    console.log(weakmap.delete(key), weakmap.delete(key2), weakmap.delete(key3)); // true false false
    ```

### 6、WeakMap 的应用

1. 存储一个对象的私有数据或隐藏实施细节。

    ```javascript
    const privites = new WeakMap();

    function Public() {
        const me = {
            // some privite data here
        };
        privites.set(this, me);
    }

    Public.prototype.method = function() {
        const me = privites.get(this);
        // do some thing with privites data
    }

    module.exports = Public;
    ```

2. 存储 DOM 节点作为键值，可以不用考虑内存泄漏的风险。

    ```javascript
    let el = document.querySelector('li');

    let weakmap = new WeakMap();

    weakmap.set(el, [clicked: 0]);

    el.addEventListener('click', function() {
        let times = weakmap.get(el);
        times.clicked++;
    }, false)
    ```

&emsp;

> **备注区域**
> 
> 1. <span id="a">SameValueZero：+0 与 -0 相等；NaN 与 NaN 相等；其余同 ===; [🔗](https://www.ecma-international.org/ecma-262/6.0/#sec-samevaluezero)</span>

&emsp;

> **参考文献**
> 1. [ECMAScript 2015 (6th Edition, ECMA-262)](https://www.ecma-international.org/ecma-262/6.0/#sec-set-objects)
> 2. [MDN 标准内置对象Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)
> 3. [阮一峰 ECMAScript 6入门 Set 和 Map 数据结构](http://es6.ruanyifeng.com/#docs/set-map#Set)