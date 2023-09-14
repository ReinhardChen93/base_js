function after(times, callback) { // 满足一个特点就是高阶函数
  return function() { // Promise.all
    if(--item === 0) {
      callback();
    }
  }
}

let newFn = after(3, function() {
  console.log('after :>> ');
})

