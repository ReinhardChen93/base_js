// babel/ polifill
// 元编程 , 可以更改我们js的具体的逻辑 Object.prototype.toString.call

// let obj = {get [Symbol.toStringTag]() {return 'abc}}
// console.log(obj.toString)

// let likeArray= {
//   0:1, 1:2, 2:3, length: 3, [Symbol.iterator]() {
//     let i = 0;
//     return { // 迭代器, 一个对象有一个next方法, 每次调用next 都会产生一个对象 具备{value,done}
//       next: () => {
//         return { value: this[i], done: ++i === this.length }
//       }
//     }
//   }
// }

// 等价上面注释的方法
// function * () {} 生成器函数语法
// let likeArray = {
//   0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function* () {
//     let i = 0
//     let len = this.length;
//     while (len !== i) {
//       yield [this[i++]];
//     }
//   }
// }

// const arr = [...likeArray]

// function* gen(params) {
//   try {
//     let a = yield 1; // js 执行时先走等号右边 , 遇到yield就直接停止
//     console.log('a', a)
//     let b = yield 2; // yield的返回值时第二次调用next传递的参数
//     console.log('b', b)
//     let c = yield 3
//     console.log('c', c)
//     return undefined
//   } catch (error) {
//     console.log('error', error)
//   }
// }

// let it = gen(); // iterator 迭代器
// console.log(it.next('a1')); // 第一次调用next方法传递的参数没有任何的意义
// it.throw('错误'); // 调用了第一次next的时候 可以暂停逻辑,如果觉得这个逻辑有异常否需可以通过throw方法抛出异常
// console.log(it.next('b2')); // { value: 1, done: false }
// console.log(it.next('c3')); // { value: 1, done: false }
// console.log(it.next()); // { value: 4, done: true }

// 查用方法
const fs = require('fs/promises');
const path = require('path');
function* readResult() { // 依旧是异步的,看起来像同步
  let filename = yield fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8');
  let age = yield fs.readFile(path.resolve(__dirname, filename), 'utf8');
  return age;
}
// 调用 generate 返回的就是 iterator 
// let it = readResult();
// let {value, done} = it.next();
// value.then((data) => {
//   let {value, done} = it.next(data);
//   value.then(data => {
//     let {value, done} = it.next(data);
//     console.log('value', value)
//   })
// }).catch((err) => {
//   console.log('err', err)
// });

// 实现co
function co(it) {
  return new Promise((resolve, reject) => { // 同步迭代for循环, 异步迭代用回调
    function next(data) { // koa express 都是这样了
      let {value, done} = it.next(data);
      if(!done) { // 如果没有完成返回的一定是一个promise
        Promise.resolve(value).then((data) => {
          next(data)
        }, reject)
      } else {
        resolve(value) // 完成value就是最后的结果
      }

    }
    next();
  })
}

// 等价上面的注释
// const co = require('co'); // 别人写的需要安装
co(readResult()).then(data => {
  console.log('data', data)
})

