'use strict';

var through = require('through'),
    q = require('q');

function destreamify(stream, input) {

    var deferred = q.defer(),
        inputStream = through(),
        result = [];

    inputStream
        .queue(input)
        .pipe(stream)
        .pipe(through(function write(data) { 
            console.log('data', data);
            result.push(data);
        }, function end() {
            console.log('end', arguments);
            deferred.resolve(result);
        }));

    inputStream.end();

    return deferred.promise;
}

module.exports = destreamify;
