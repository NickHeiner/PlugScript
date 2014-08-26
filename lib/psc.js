'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    through = require('through'),
    tokenize = require('./tokenize'),
    lex = require('./lex'),
    parse = require('./parse'),
    generate = require('./generate');

function psc(optFile) {

    var input = _.isString(optFile) ? fs.createReadStream(optFile) : through();

    return input
        .pipe(tokenize())
        .pipe(lex())
        // .pipe(parse())
        // .pipe(generate())

        // just for debugging
        .pipe(require('through')(function(data) {
            this.queue(require('util').inspect(data));
        }));
}

module.exports = psc;
