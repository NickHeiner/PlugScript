'use strict';

var expect = require('chai').expect,
    _ = require('lodash'),
    lex = require('../../lib/lex'),
    destreamify = require('../lib/destreamify');

describe('lex', function() {

    var runLex;

    beforeEach(function() {
        runLex = _.partial(destreamify, lex());
    });

    it('lexes an identifier', function() {
        return expect(runLex('foo')).to.eventually.deep.equal({
            type: 'identifier',
            value: 'foo'
        });
    });

    it('lexes a keyword', function() {
        return expect(runLex('fun')).to.eventually.deep.equal({
            type: 'keyword',
            value: 'fun'
        });
    });

    it('lexes an operator', function() {
        return expect(runLex('+')).to.eventually.deep.equal({
            type: 'operator',
            value: '+'
        });
    });

    it('lexes a literal', function() {
        return expect(runLex('2')).to.eventually.deep.equal({
            type: 'literal',
            value: '2'
        });
    });

});
