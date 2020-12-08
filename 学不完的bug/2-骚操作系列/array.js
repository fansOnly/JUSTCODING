// https://juejin.im/post/5e5ef2f9f265da57685dc9c1?utm_source=gold_browser_extension


// 平滑滚动到页面顶部
const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
}

// 事例
scrollToTop()


// 创建一个包含当前URL参数的对象
const getURLParameters = url => (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
);

// 事例
getURLParameters('http://url.com/page?n=Adam&s=Smith'); // {n: 'Adam', s: 'Smith'}
getURLParameters('google.com'); // {}


// 将一组表单元素转化为对象
const formToObject = form =>
    Array.from(new FormData(form)).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: value
        }),
        {}
    );

// 事例
formToObject(document.querySelector('#form'));
// { email: 'test@email.com', name: 'Test Name' }


// 从对象检索给定选择器指示的一组属性
const get = (from, ...selectors) =>
    [...selectors].map(s =>
        s
            .replace(/\[([^\[\]]*)\]/g, '.$1.')
            .split('.')
            .filter(t => t !== '')
            .reduce((prev, cur) => prev && prev[cur], from)
    );
const obj = { selector: { to: { val: 'val to select' } }, target: [1, 2, { a: 'test' }] };

// Example
get(obj, 'selector.to.val', 'target[0]', 'target[2].a');
// ['val to select', 1, 'test']



// 自定义事件的函数有 Event、CustomEvent 和 dispatchEvent

const triggerEvent = (el, eventType, detail) =>
  el.dispatchEvent(new CustomEvent(eventType, { detail }));

// 事例
triggerEvent(document.getElementById('myId'), 'click');
triggerEvent(document.getElementById('myId'), 'click', { username: 'bob' });


// 获得给定毫秒数的可读格式
const formatDuration = ms => {
    if (ms < 0) ms = -ms;
    const time = {
      day: Math.floor(ms / 86400000),
      hour: Math.floor(ms / 3600000) % 24,
      minute: Math.floor(ms / 60000) % 60,
      second: Math.floor(ms / 1000) % 60,
      millisecond: Math.floor(ms) % 1000
    };
    return Object.entries(time)
      .filter(val => val[1] !== 0)
      .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
      .join(', ');
  };
  
  // 事例
  formatDuration(1001); // '1 second, 1 millisecond'
  formatDuration(34325055574); 
  // '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'

  

//   为指定选择器创建具有指定范围，步长和持续时间的计数器
const counter = (selector, start, end, step = 1, duration = 2000) => {
    let current = start,
      _step = (end - start) * step < 0 ? -step : step,
      timer = setInterval(() => {
        current += _step;
        document.querySelector(selector).innerHTML = current;
        if (current >= end) document.querySelector(selector).innerHTML = end;
        if (current >= end) clearInterval(timer);
      }, Math.abs(Math.floor(duration / (end - start))));
    return timer;
  };
  
  // 事例
  counter('#my-id', 1, 1000, 5, 2000); 
  // 让 `id=“my-id”`的元素创建一个2秒计时器
  

  

//   确定页面的浏览器选项卡是否聚焦
const isBrowserTabFocused = () => !document.hidden;

// 事例
isBrowserTabFocused(); // true
