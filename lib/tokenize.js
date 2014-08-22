'use strict';

var through = require('through');

function tokenize() {
    return through(function write(sourceCode) {
        var self = this;
        sourceCode.toString().split(' ').forEach(function(token) {
            self.queue(token);
        });
    }, function end() {
        this.queue(null);
    });
}

module.exports = tokenize;
