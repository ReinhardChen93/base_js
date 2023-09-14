// 装饰器
Function.prototype.before = function(callback) {
  let self = this;
  return function() {
    callback();
    self.apply(self, arguments);
  }
}
function fn(val) {
  console.log('一定的功能' + val)
}

let newFn = fn.before((function() {
  console.log('在函数执行前执行 :>> ');
}))

newFn('hello!');