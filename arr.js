// 数组的方法
/**
 * @es5 forEach reduce map filter some every
 * @es6 find findIndex
 * @es7 includes
 */

/**
 * @reduce 收敛
 * 经常用在求和
 */

let r = [1,2,3,4,5,6].reduce((a, b)=>{
  return a + b
});
let m = [{price:100,count:1},{price:200,count:2},{price:400,count:4}].reduce((a, b)=>{
  return [
    a + b.price * b.count
  ]
},0); // 手动添加数组第一项
console.log('r :>> ', r);
console.log('m :>> ', m);
// reduce 常见功能 多个数据 最终变成一个数据

let keys = ['name', 'age'];
let values = ['cc', 18]; // => {name: 'cc', age: 18}
let obj = keys.reduce((memo, current, index, currentTarget) => { // currentTarget当前循环的数组
  memo[current] = values[index];
  return memo;
},{})
console.log('obj :>> ', obj);

function sum(a,b) {
  return a + b;
}

function toUpper(str) {
  return str.toUpperCase();
}

function add(str) {
  return "****" + str + "****"
}

// function compose(...fns) {
//   return function(...args) {
//     let lastFn = fns.pop();
//     return fns.reduceRight((a,b) => {
//       return b(a)
//     },lastFn(...args));
//   }
// }

// let compose = (...fns) => (...args) => {
//   let lastFn = fns.pop();
//   return fns.reduceRight((a,b) => b(a), lastFn(...args));
    
// }

// function compose(...fns) {
//   return fns.reduce((a, b) => { // 此时返回的函数 是通过reduce 方法返回的
//     return (..args) => {
//       return a(b(...args))
//     }
//   })
// }

let compose = (...fns) => fns.reduce((a, b) => (..args) => a(b(...args))
// compose 组合方法
let x = compose(add, toUpper, sum)('reinhard', 'cc')
console.log('x :>> ', x);