// 无论成功和失败都要执行的逻辑
Promise.resolve()
  .finally(res => {
    console.log('todo :>> ');
  })
  .then((value) => {
    console.log('成功 :>> ', value);
  })
  .catch((value) => {
    console.log('失败', value)
  })

finally = function (fn) {
  return this.then((val) => {
    return Promise.resolve(fn()).then(val => val)
  }, (r) => {
    return Promise.resolve(fn()).then(() => {throw r})
  })
}