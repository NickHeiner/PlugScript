var through = require('through');

var stream = through();

stream.push('asdf');

stream.pipe(process.stdout);

stream.end();
