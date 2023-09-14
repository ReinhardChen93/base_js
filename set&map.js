// set / map 是两种存储结构

// set 集合不能重复

let s = new Set([1,2,3,4,5,6,1,2,3,4,5,6])
console.log(typeof s)
s.add(7);
s.delete(1)
console.log(`s`, s)
// 集合 并集 交集 差集
let s01 = [1,2,3,1,2,7]
let s02 = [3,4,5,1,2]
function union() {
  let s1 = new Set(s01)
  let s2 = new Set(s02)
  console.log(`[...new Set[...s1,...s2]]`, [...new Set([...s1,...s2])])
}
union()

function intersection() { // 交集
  return [...new Set(s01)].filter((item) => {
    return new Set(s02).has(item)
  })
}
console.log(`intersection()`, intersection())

function diff() { // 差集
  return [...new Set(s01)].filter((item) => {
    return !new Set(s02).has(item)
  })
}
console.log(`diff()`, diff())

// map 是有key的, 不能放重复的

let m = new Map();
m.set('name','reinhard');
console.log(`m`, m)
let w = new WeakMap(); // WeakMap的key必须是对象
let obj = {name: 'cc'}
w.Set(obj, '123')
obj = null
console.log(`w`, w)
