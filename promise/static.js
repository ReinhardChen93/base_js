// 上一个输出是下一个的输入
// Promise.all 等待所有的promise成功 才成功
const fs = require('fs');
const path = require('path');
const Promise = require('./promise');
function readFile(url) {

  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf-8', function (err, data) {
      if (err) return reject(err)
      resolve(data)
    })
  })

}
Promise.all([
  readFile(path.resolve(__dirname, 'name.txt')),
  readFile(path.resolve(__dirname, 'age.txt'))
]).then(data => {
  console.log('data :>> ', data);
}).catch(err => {
  console.log('err :>> ', err);
})
// 那个结果快就用那个
// 用他来中断成功的结果
// 超时处理可以采用race方法
Promise.race([
  readFile(path.resolve(__dirname, 'name.txt')),
  readFile(path.resolve(__dirname, 'age.txt'))
]).then(data => {
  console.log('data :>> ', data);
}).catch(err => {
  console.log('err :>> ', err);
})
// 如何让promise走向失败
// 可以自己构建一个promise,和用户写的放在一起,如果我想让用户的失败,我就让内置的promise失败就可以了
function withAbout (userPromise) {
  let abort;
  const internalPromise = new Promise((resolve, reject) => {
    abort = reject
  })
  let p = Promise.race([userPromise, internalPromise])
  p.abort = abort
  return
}

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 3000);
})

p = withAbout(p)
p.then(data => {
  console.log(data)
}).catch(err => { // 如何让这个promise 走向失败
  console.log('err :>> ', err);
})