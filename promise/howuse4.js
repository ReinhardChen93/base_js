// 穿透
const Promise = require('./promise');
new Promise((resolve, reject) => {
  resolve(100)
}).then().then().then((data) => {
  console.log('data :>> ', data);
})