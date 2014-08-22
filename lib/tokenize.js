'use strict';

var through = require('through');

function tokenize() {
    return through(function write(sourceCode) {
        var self = this;
        // TODO Add some tests. This doesn't do everything that we want.
        sourceCode.toString().split(/\b/).forEach(function(token) {
            self.queue(token);
        });
    }, function end() {
        this.queue(null);
    });
}

module.exports = tokenize;
