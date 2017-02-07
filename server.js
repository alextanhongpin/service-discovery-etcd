// Standalone server setup

const port = process.env.PORT || 3001

http.createServer(app).listen(port, function (error) {
  if (error) {
    logger.error(error)
  } else {
    logger.info('Listening on http://localhost:', port)

    if (process.env.SELF_REGISTRY) {
      registy.register({
        name: serviceName,
        url: '/tickets',
        endpoints: [{
          type: 'http',
          url: 'http://127.0.0.1:' + port + '/tickets'
        }],
        authorizedRoles: ['tickets-query']
      }, function (error) {
        if (error) {
          logger.error(error)
          process.exit()
        }
      })
    }
  }
})

function exitHandler () {
  if (process.env.SELF_REGISTRY) {
    registry.unregister(serviceName, function (error) {
      if (error) {
        logger.error(err)
      }
      process.exit()
    })
  } else {
    process.exit()
  }
}

process.on('exit', exitHandler)
process.on('SIGINT', exitHandler)
process.on('SIGTERM', exitHandler)
process.on('UncaughtException', exitHandler)