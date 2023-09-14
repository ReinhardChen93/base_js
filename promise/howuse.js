/**
 * 1. Promise 是一个类, 使用的时候需要new Promise实例
 * 2.构造函数中需要传递一个参数 executor
 * 3.executor函数中有两个参数 resolve(value) reject(reson)
 * 4.调用resolve会让promise变成成功 调用reject会变成失败 pending等待状态 fulfilled 成功状态 rejected 失败状态
 * 5.每个promise实例都有一个then方法, 会有两个参数 onfulfilled , onrejected
 * 6.如果不调用resolve 此时 promise不会成功也不会失败 (如果发生异常也会认为是失败)
 * 7.resolve之后不能reject 相反也是
 * 8.excutor是立刻执行的
 */

const promise = new Promise((resolve, reject) => {
  // resolve('成功')
  // throw new Error('error')
  // reject('失败')
  console.log('1', 1)
})
console.log(2)
promise.then((value) => {
  console.log('成功', value)
}, (error) => {
  console.log('失败', error)
})