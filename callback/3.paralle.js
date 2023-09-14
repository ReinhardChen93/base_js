// 并发调用接口 两个ajax ajax1=>name ajax2 => age
let fs = require('fs'); // fileSystem;
function after(times, callback) {
  let result = {}
  return function(key, data) {
    result[key] = data;
    if(--times === 0) {
      callback(result);
    }
  }
}

let newFn = after(2, function(result) {
  console.log('result :>> ', result);
});
fs.readFile('./name.txt', 'utf8',function(err,data) {
  if(err) return console.log('err :>> ', err);
  console.log('data :>> ', data);
  newFn('name', data)
})

fs.readFile('./age.txt', 'utf8',function(err,data) {
  if(err) return console.log('err :>> ', err);
  console.log('data :>> ', data);
  newFn('age', data)
})

console.log('hello :>> ');