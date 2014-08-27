'use strict';

var expect = require('chai').expect,
    _ = require('lodash'),
    tokenize = require('../../lib/tokenize'),
    destreamify = require('../lib/destreamify');

describe('tokenize', function() {

    var runTokenize;

    beforeEach(function() {
        runTokenize = _.partial(destreamify, tokenize());
    });

    it('splits words', function() {
        return expect(runTokenize('foo bar baz')).to.eventually.deep.equal(['foo', 'bar', 'baz']);
    });

    it('splits parens', function() {
        return expect(runTokenize('(expr)')).to.eventually.deep.equal(['(', 'expr', ')']);
    });

    it('splits operators', function() {
        return expect(runTokenize('fun foo n -> n')).to.eventually.deep.equal(['fun', 'foo', 'n', '->', 'n']);
    });

    it('does not include newlines', function() {
       return expect(runTokenize('fib\n3')).to.eventually.deep.equal(['fib', '3']); 
    });

    it('strips whitespace', function() {
       return expect(runTokenize('1 + 2')).to.eventually.deep.equal(['1', '+', '2']); 
    });

});
