// Objecet.defineProperty es5 vue
// 通过Object.defineProperty定义属性 可以增加连接器
let obj = {}
let other = ''
// 不可枚举
Object.defineProperty(obj,'name', {
  enumerable: true, // 是否可以枚举
  configurable: true, // 是否可以配置(删除)
  // writable: true, // 是否可以重写
  // value: 'reinhard',
  get() { // 读取
    return other
  },
  set(val) {// 设置
    other = val
  }
})
console.log('obj :>> ', obj);
delete obj.name
obj.name = 'cc'
console.log(`obj.name`, obj.name)
// 简写
let Obj = {
  other: '123',
  get name() {
    return this.other;
  },
  set name(val) {
    this.other = val
  }
}
Obj.name = 345
console.log('Obj :>> ', Obj.name);

// 对象的setter和getter

// vue 的数据劫持

function update() {
  console.log('更新视图 :>> ');
}

let data = {
  name: 'xx',
  age: '12',
  adderss: {
    location: 'ddd'
  }
}

// vue 的数据劫持
function observer(obj) { // Object.defineProperty只能用在 对象上(数组也不是别)
  if(typeof obj !== 'object') return obj;
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      defineReactive(obj, key, element);

    }
  }
}

// 模拟vue 响应式
function defineReactive(obj, key, value) {
  observer(value)
  Object.defineProperty(obj, key, {
    get() {
      return value;
    },
    set(val) {
      if(val !== value) {
        observer(val)
        update()
        value = val
      }
    }
  })
}

observer(data);
data.name = 'cc'
data.adderss ={
  location: 'km'
}

// 数组修改的监听
data.address = [1, 2, 3];
let methods = ['push', 'slice', 'pop', 'sort', 'reverse', 'unshift'];
methods.forEach(method => {
  // 面向切片开发 装饰器
  let oldMethod = Array.prototype[method];
  // 重写原有方法,加入新方法
  Array.prototype[method]= function() {
    update();
    oldMethod.call(this, ...arguments);
  }
});

data.address.push(4);