'use strict';

var expect = require('chai').expect,
    _ = require('lodash'),
    parse = require('../../lib/parse'),
    destreamify = require('../lib/destreamify');

describe('parse', function() {

    var runParse;

    beforeEach(function() {
        runParse = _.partial(destreamify, parse());
    });

    it('parses a literal expression', function() {
        return expect(runParse([{
            type: 'literal',
            value: '2'
        }])).to.eventually.deep.equal({
            type: 'expression',
            children: [{
                type: 'literal',
                value: '2'
            }]
        });
    });

});
