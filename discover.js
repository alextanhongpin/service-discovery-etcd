const package = require('./package.json')
const path = require('path')
const Etcd = require('node-etcd')

const etcd = new Etcd()

function etcdDiscover (name, options, callback) {
  const key = path.join('/', 'services', name)
  etcd.get(key, options, function (error, value) {
    if (error) {
      return callback(error)
    }
    const value = JSON.parse(value.node.value)
    return callback(null, value, etc.watcher(key))
  })
}

console.log(`${package.name} is looking for \${myservice}\...`)

etcdDiscover('myservice', { wait: true }, function (error, node, watcher) {
  if (error) {
    console.log(error.message)
    process.exit(1)
  }
  console.log(`${package.name} discovered node: `, node)
  watcher
  .on('change', (data) => {
    console.log(`Value changed: new value:`, node)
  })
  .on('expire', (data) => {
    console.log('Value expired')
  })
  .on('delete', (data) => {
    console.log('Value deleted')
  })
})