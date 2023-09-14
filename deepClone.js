// 深拷贝方法(递归拷贝)
// typeof instanceof Object.prototype.toString.call constructor
function deppClone(obj, hash = new WeakMap()) {
  if(obj == null) return obj;
  // 不是对象就不用拷贝
  if(obj instanceof Data) return new Date(obj); // 如果是时间类型
  
  if(obj instanceof RegExp) return new RegExp(obj) // 如果是正则
  
  if(typeof obj !== 'object') return obj;
  // 判断这个obj 是数组还是对象
  // let cloneObj = Object.prototype.toString.call(obj) === ['Object Array'] ? [] : {}
  if(hash.has(obj)) return hash.get(obj); // 如果WeakMap中有对象就直接返回
  
  let cloneObj = new obj.constructor;
  // 如果是对象把他放到WeakMap中,如果在拷贝这个对象这个对象就存在了 直接返回这个对象即可
  hash.set(obj, cloneObj)
  
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      // 如果赋予的值是对象,就把这个对象放到WeakMap中
      cloneObj[key] = deppClone(element, hash);
    }
  }
  return cloneObj
}