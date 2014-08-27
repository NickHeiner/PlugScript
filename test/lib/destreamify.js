'use strict';

var through = require('through'),
    q = require('q');

function destreamify(stream, input) {

    var deferred = q.defer(),
        inputStream = through(),
        result = [];

    inputStream
        .pipe(stream)
        .pipe(through(function write(data) { 
            result.push(data);
        }, function end() {
            deferred.resolve(result);
        }));

    inputStream.queue(input);
    inputStream.end();

    return deferred.promise;
}

module.exports = destreamify;
