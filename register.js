const path = require('path')
const Etcd = require('node-etcd')
const etcd = new Etcd()

const package = require('./package.json')

function etcdRegister () {
  const p = path.join('/', 'services', 'myservice')
  etcd.set(p, JSON.stringify({
    hostname: '127.0.0.1',
    port: 3000,
    pid: process.pid,
    name: package.name
  }), {
    ttl: 10
  })
  setTimeout(etcdRegister, 5000)
  return p
}

console.log(`Registered with etcd as ${p}`)
console.log(`${package.name} registered with etcd as ${etcdRegister()}`)
