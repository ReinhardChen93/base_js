console.log('my Promise');
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
// 此函数主要的目的是判断x 是不是promise
// 规范中说明 我们的promise 可以和别人的promise 互通
function resolvePromise(x, promise2, resolve, reject) {
  // 用x 的值来决定promise2 是成功还是失败(resolve, reject)
  // 返回的x 与 promise2 不可以是同一个
  if (x === promise2) {
    return reject(new TypeError('[TypeError: Chaining cycle detected for promise #<Promise>]'))
  } else if ((typeof x === 'object' && x !== null) || (typeof x === 'function')) {
    let called = false;
    try {
      let then = x.then; // 看是否有then方法
      if (typeof then === 'function') {
        // 不直接使用x.then的原因是因为 不用每次都取值了,直接用上次取到的结果
        then.call(x, (y) => {
          if (called) return
          called = true
          // 成功了还需要解析
          // 因为返回的y有可能还是一个promise
          resolvePromise(y, promise2, resolve, reject)
        }, (r) => {
          // 失败直接返回
          if (called) return
          called = true
          reject(r)
        })
      } else {
        resolve(x) // {then: {}} 可能是个对象
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error) // 取值出错了
    }
  } else { // 说明x是个普通值
    resolve(x); // 普通值 直接向下传递
  }
}
class Promise {
  constructor(executor) {
    // 默认promise状态
    this.status = PENDING;
    this.value = undefined;
    this.reson = undefined;
    this.onResolveCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      // 只有pending状态才可以修改状态

      // 为了满足 ECMAScript 的功能
      if(value instanceof Promise) {
        // 直接递归解析
        return value.then(resolve, reject)
      }

      if (this.status === PENDING) {

        this.value = value
        this.status = FULFILLED
        this.onResolveCallbacks.forEach(fn => fn())
      }
    }

    const reject = (error) => {

      if (this.status === REJECTED) {
        this.reson = error
        this.status = REJECTED
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try { // 如果excutor 执行发生异常 就默认等价于reject
      executor(resolve, reject)
    } catch (error) {

      reject(error)
    }

  }
  then(onFulfilled, onRejected) {
    // then 方法中如果没有传递参数,那么可以透传到下一个then中
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (data) => data
    onRejected = typeof onRejected === 'function' ? onRejected : (reson) => { throw new Error(reson)}
    // then的时候需要返回全新的promise ,并且要是异步的
    let promise2 = new Promise((resolve, reject) => {

      if (this.status === FULFILLED) {
        // 要想拿到promise2 需要保证promise2 new 完
        // process.nextTick 可以等待当前代码new 完以后再执行,属于node
        process.nextTick(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })

      }
      if (this.status === REJECTED) {
        process.nextTick(() => {
          try {
            let x = onRejected(this.reson)
            resolvePromise(x, promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })

      }
      if (this.status === PENDING) {

        this.onResolveCallbacks.push(() => {

          process.nextTick(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(x, promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })


        })

        this.onRejectedCallbacks.push(() => {

          process.nextTick(() => {
            try {

              let x = onRejected(this.reson)
              resolvePromise(x, promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })

        })

      }
    })
    return promise2
  }
  catch(errFn) {
    return this.then(null, errFn) // 针对失败做处理
  }
  static resolve = function(value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
  static all = function (values) {
    return new Promise((resolve, reject) => {
      let idx = 0;
      let result = [];
      values.forEach((item, i)=> {
        Promise.resolve(item).then((val) => {
          result[i] = val // 用索引映射的结果
          if(++idx === values.length) {
            resolve(result)
          }
        }, reject) // 如果任何一个promise失败那么all就失败了
      })
    })
  }
  static race = function (values) {
    return new Promise((resolve, reject) => {
      values.forEach((item, i)=> {
        Promise.resolve(item).then(resolve, reject)
      })
    })
  }

  static finally = function (fn) {
    return this.then((val) => {
      return Promise.resolve(fn()).then(val => val)
    }, (r) => {
      return Promise.resolve(fn()).then(() => {throw r})
    })
  }
}

Promise.deferred = function () {
  const dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd;
}

module.exports = Promise
