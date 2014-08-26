'use strict';

var through = require('through');

function tokenize() {
    return through(function write(sourceCode) {
        console.log('sourceCode', sourceCode);
        var self = this;
        sourceCode.toString().split(/\b/).forEach(function(token) {
            self.queue(token);
        });
    }, function end() {
        this.queue(null);
    });
}

module.exports = tokenize;
