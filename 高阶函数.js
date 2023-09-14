// 高阶函数
// 一个函数返回一个函数,那么这个函数就是高阶函数
// 一个函数的参数是一个函数,那么这个函数也是高阶函数
// function a() {
//   return function {

//   }
// }

// function a(callback) {
//   callback()
// }
// a(function() {})

// function a(fn) {
//   return function() {
//     fn() // 二者都满足也是高阶函数
//   }
// }

/**
 * 能解决什么问题
 * 1.对函数进行扩展
 * AOP 切片函数,增加额外的逻辑
 */
function core(a,b,c) { // 我们希望对这个core进行封装
  console.log('核心逻辑', ...arguments)
}
// Function.proptoptype.before 也可以解决this指向问题
core.before = function (fn) {
  return (...args) => { // 箭头函数没有this也没有原型,也没有arguments
    // todo...
    fn(); // 做的其他逻辑
    this(...args) // AOP窃明增加额外的逻辑,在原有的逻辑中增添额外的逻辑
    // todo...
  }
}
const newCore = core.before(() => {
  console.log('我添加的额外逻辑')
})
newCore(1,2,3);

// 能做什么?
// 高阶函数 可以对原有的函数进行扩展
// 函数柯里化(可以让-个函数变得更小) 基于高阶函数 核心是缓存变量 如何缓存-通过闭包完成