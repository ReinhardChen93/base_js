const Promise = require('./promise');

let promise = new Promise((resolve, reject) => {

  resolve()
})

// 如果返回的是promise2 那么会涉及到promise2 等待promise2成功,自己等待自己完成
let promise2 = promise.then(data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({1234})
        }, 1000);
      }))
    }, 100);
  })
}, (err) => {
  console.log('err :>> ', err);
})
promise2.then(data => {
  console.log(data, 'outer')
}, (err) => {
  console.log('err :>> ', err);
})