'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    through = require('through'),
    path = require('path'),
    grammar = fs.readFileSync(path.join(__dirname, 'grammar.jison'), 'utf-8'),
    util = require('util'),
    Parser = require('jison').Parser;

function psc(opts) {

    var input,
        plugScriptParser = new Parser(grammar);

    if (opts.file) {
        input = fs.readFileSync(opts.file, 'utf-8');
    } else if (opts.code) {
        input = opts.code;
    } else {
        throw new Error('Either opts.file or opts.code is required, but opts is: ' + util.inspect(opts));
    }

    return plugScriptParser.parse(input);
}

module.exports = psc;
