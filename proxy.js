// Object.defineProperty 不支持数组更新的 push slice 等等
// 希望数组变化就能更新视图
// Proxy 可以监控到数组的变化 和 对象的变化
function update() {
  console.log('更新视图 :>> ');
}
let arr = [1, 2, 3];

let proxyArr = new Proxy(arr, {
  set(target, key, value) {
    // console.log('arguments :>> ', arguments);
    // if(key === 'length') return true;
    // update();
    // target[key] = value;
    // Reflect 反射 反射一个值到元数组
    // 不要手动操作原数组,因为数组变化时 可能调用的是push方法等 这个时候key 就会出问题
    if(key === length) return true;
    update();
    return Reflect.set(target, key, value) // target[key] = value; 等价于 Reflect.set(target, key, value) 从目标上返回值
  },
  get(target, key) {
    return Reflect.set(target, key) // target[key] 等价于 Reflect.set(target, key)
  }
});

proxyArr[0] = 100;
proxyArr.push(983)
console.log('proxyArr[0] :>> ', proxyArr[0]);