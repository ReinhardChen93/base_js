// Promise.resolve 是ECMAScript 自己实现的 (为了能快速创建promise并且)
const Promise = require('./promise');
Promise.resolve('abc').then(data => {
  console.log('data :>> ', data);
})