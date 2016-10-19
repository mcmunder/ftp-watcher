# ftp-watcher

[![Join the chat at https://gitter.im/mcmunder/ftp-watcher](https://badges.gitter.im/mcmunder/ftp-watcher.svg)](https://gitter.im/mcmunder/ftp-watcher?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Watch an FTP server for file and directory tree changes.

[![NPM](https://nodei.co/npm/ftp-watcher.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ftp-watcher/)

## Install
`npm install --save ftp-watcher`

## Run tests
`npm run test`


## Usage

Create a new FtpWatcher instance and pass an options object with properties `ftpCredentials` and `cron`. Since ftp-watcher depends on the popular FTP client module [ftp](https://www.npmjs.com/package/ftp), the `ftpCredentials` must match the options object that can be passed to [ftp's](https://www.npmjs.com/package/ftp) `ftp.connect()` method.

Calling `watch()` on the new ftp-watcher instance causes it to emit `'snapshot'` events with a frequency set by the passed cron expression. Each `'snapshot'` event contains an array of path strings representing a complete snapshot of the FTP server's directory tree. A `fileExtension` and/or `fileNameContains` string can be passed optionally to filter the emitted snapshots. An ftp-watcher instance can be stopped by calling its `stop()` method.

```js
const FtpWatcher = require('../src/index')

const ftpCredentials = {
  host: 'speedtest.tele2.net' // a public FTP test server
  // port: defaults to 21
  // user: defaults to anonymous
  // password: anonymous@
}

const speedtestWatcher = new FtpWatcher({
  ftpCredentials: ftpCredentials,
  cron: '*/10 * * * * *'
  // fileExtension: '.zip', // optional
  // fileNameContains: 'GB' // optional
})

speedtestWatcher.on('error', handleError)
speedtestWatcher.on('snapshot', handleSnapshot)

function handleSnapshot (snapshot) {
  console.log(snapshot)
  // speedtestWatcher.stop()
}

function handleError (error) {
  console.error(error)
}

speedtestWatcher.watch()
```

## Todos

- Add more tests  

## Copyright and license

Copyright 2016 Matthias Munder.  
Licensed under the [MIT license](./LICENSE).


[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
