const FtpWatcher = require('../src/index')
// const test = require('tape')

// test('test ftp-watcher', should => {
  const ftpCredentials = {
    host: 'speedtest.tele2.net' // a public FTP test server
  // port: defaults to 21
  // user: defaults to anonymous
  // password: anonymous@
  }

  const speedtestWatcher = new FtpWatcher({
    ftpCredentials: ftpCredentials,
    cron: '*/10 * * * * *',
    fileNameContains: '100GB'
  })

  speedtestWatcher.on('error', handleError)
  speedtestWatcher.on('snapshot', handleSnapshot)

  function handleSnapshot (snapshot) {
    console.log(snapshot)
    // should.equal(snapshot[0], '/100GB.zip')
    // speedtestWatcher.stop()
  }

  function handleError (error) {
    console.error(error)
  }

  speedtestWatcher.watch()

//   should.end()
// })
