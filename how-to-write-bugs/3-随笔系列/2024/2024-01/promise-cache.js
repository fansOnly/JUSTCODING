/**
 * 缓存多次相同的请求，避免重复发送
 */
let promiseCache = {};
const request = (type, url, data) => {
  const key = JSON.stringify([type, url, data]);
  if (promiseCache[key]) {
    return promiseCache[key];
  }
  const fetchPromise = fetch(url, {
    method: type,
    data: JSON.stringify(data)
  })
  .then((res) => res.json())
  .finally(() => {
    delete promiseCache[key];
  })

  return promiseCache[key] = fetchPromise;
}