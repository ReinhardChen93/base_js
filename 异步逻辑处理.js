const fs = require('fs');
const path = require('path');
// 使用readFile 时尽量使用绝对路径
// path 就是用于获取绝对路径的
// node 中的api 第一个参数都是err , 意味着error-first 优先处理错误

// 同步多个异步操作的返回结果(promise.all)
let person = {

}
function after(times, callback) { // 高阶函数来处理异步问题
  return function () {
    if (--times === 0) {
      callback()
    }
  }
}

let out = after(2, function () {
  console.log(person)
})

fs.readFile(path.resolve(__dirname, 'age.txt'), 'utf8', function (err, data) {

  if (!err) {
    
    person.age = data
    out()
  }
});

fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8', function (err, data) {

  if (!err) {
   
    person.name = data
    out()
  }
});

