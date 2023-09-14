const fs = require('fs');
const path = require('path');

let person = {

}
let event = {
  on() { },
  emit() { }
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
