const vimlint = require('vimlint')

function lint(file) {
  return new Promise((resolve, reject) => {
    vimlint(file, (err, stdout, stderr) => {
      if (err) { console.warn(stdout || stderr) }
      resolve(err)
    })
  })
}

module.exports = function () {
  this.vimlint = function (opts) {
    return this.unwrap(files => {
      return Promise.all(files.map(f => lint(f)))
        .then(results => {
          const errors = results.filter(r => r)
          if (errors.length > 0) {
            const msg = errors.length + '/' + files.length + ' files lint failed'
            console.warn(msg)
            return Promise.reject(msg)
          }
          console.log(files.length + ' files lint free')
        })
    })
  }
}
