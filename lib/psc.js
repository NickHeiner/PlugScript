'use strict';

var fs = require('fs'),
    tokenize = require('./tokenize'),
    lex = require('./lex'),
    parse = require('./parse'),
    generate = require('./generate');

function psc(file) {
    fs.createReadStream(file)
        .pipe(tokenize())
        // .pipe(lex())
        // .pipe(parse())
        // .pipe(generate())
        .pipe(process.stdout);
}

module.exports = psc;
