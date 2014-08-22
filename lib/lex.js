'use strict';

var through = require('through'),
    _ = require('lodash'),

    keywords = [
        'fun',
        '->',
        'if',
        'then',
        'else',
        '(',
        ')'
    ],

    literals = [
        '0',
        '1',
        '2'
    ],

    operators = [
        '+',
        '<='
    ];

function recognize(token) {

    function getType(token) {
        if (_.contains(keywords, token)) {
            return 'keyword';
        }

        if (_.contains(operators, token)) {
            return 'operator';
        }

        if (_.contains(literals, token)) {
            return 'literal';
        }

        return 'identifier';
    }

    return {
        type: getType(token),
        value: token    
    };
}

function lex() {
    return through(function write(token) {
        this.queue(recognize(token));
    }, function end() {
        this.queue(null);
    });
}

module.exports = lex;
