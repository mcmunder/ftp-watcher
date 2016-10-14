# ftp-watcher

Watch an FTP server for file and directory tree changes.

## Install

`npm install --save ftp-watcher`

## Usage

Simply create a new FtpWatcher instance and pass an options object with `ftpCredentials` and a `cron` string. The ftp-watcher depends on the popular FTP client module [ftp](https://www.npmjs.com/package/ftp). The `ftpCredentials` object therefore must match the options that can be passed to the [ftp's](https://www.npmjs.com/package/ftp) `ftp.connect()` method.

The ftp-watcher exposes a `watch()` method. Invoking `watch()` causes ftp-watcher to emit `'snapshot'` events with a frequency set by the passed cron expression. Each `'snapshot'` event contains an array of path strings representing a complete snapshot of the FTP server's directory tree. A `fileExtension` and/or `fileNameContains` string can be passed optionally to filter the emitted snapshot.

An ftp-watcher instance can be stopped by calling its `stop()` method.

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
