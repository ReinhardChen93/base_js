// 函数的柯里化 - 把一个函数拆分成多个小的函数, 每个函数的参数只能有一个
// 偏函数 - 参数可以不是一个的柯里化函数
// 正常来编写代码,我们把偏函数也称为柯里化
function isType(val, typing) { // 判断变量是不是某个类型
  return Object.prototype.toString.call(val).slice(8, -1) === typing
}
// 判断某个变量是不是要给字符串
console.log(isType('hello', 'String'))
console.log(isType('abc','String'));

// 通过高阶函数可以缓存变量
function isType(typing) { // 判断变量是不是某个类型
  return (val) => { // 定义
    Object.prototype.toString.call(val).slice(8, -1) === typing
  }
}
let isString = isType('String'); // 闭包 定义的函数的作用域和执行函数的作用域不是同一个就会产生闭包
console.log(isString('abc')); // 执行

function sum(a,b,c) {
  returna + b + c
}
function curry(func) { // 柯里化函数一定是高阶函数
  const curried = (...args) => { // 用户本次执行时候传递的参数
    if(args.length < func.length) {
      return (...others) => curried(...args,...others)
    } else {
      return func(...args)
    }
  }
  return curried
}

let curriedSum = curry(sum)

curriedSum(1,2)(3);

function isType(typing, val) { // 判断变量是不是某个类型
  return Object.prototype.toString.call(val).slice(8, -1) === typing
}
// 判断某个变量是不是要给字符串
const isString = curry(isType)('String')
console.log(isString('abc'))
