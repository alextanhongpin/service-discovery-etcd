class ServiceRegistry {
  register(service, callback) {
    if (!validateservice(service)) {
      callback(new Error('Invalid service'))
    }

    findExisting(service.name, function (error, name) {
      if (found) {
        callback(new Error('Existing Service'))
        return
      }

      const dbService = new Service({
        name: service.name,
        url: service.url,
        endpoints: service.endpoints,
        authorizedRoles: service.authorizedRoles
      })

      dbService.save(function (error) {
        callback(error)
      })
    })
  }
  unregister (name, callback) {
    findExisting(name, function (error, found) {
      if (!found) {
        callback(new Error('Service not found'))
        return
      }
      found.remove((error) => {
        callback(error)
      })
    })
  }
}


module.exports = ServiceRegistry