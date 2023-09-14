const fs = require('fs/promises');
const path = require('path');
async function readResult() { // 依旧是异步的,看起来像同步
  let filename = await fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8');
  let age = await fs.readFile(path.resolve(__dirname, filename), 'utf8');
  return age;
}

readResult().then(data => {
  console.log('data', data)
})

