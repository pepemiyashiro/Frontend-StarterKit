const fixture = __dirname + '/fixture.js'

const detective = require('detective')
const test = require('tape')
const fs = require('fs')
const bl = require('bl')
const tr = require('./')

test('remove-try-require', function(t) {
  t.plan(2)

  fs.createReadStream(fixture)
    .pipe(tr(fixture))
    .pipe(bl(function(err, data) {
      t.ifError(err, 'transformed successfully')
      t.deepEqual(detective(data), ['y'], 'removes "try" require but not "catch" require')
    }))
})
