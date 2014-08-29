'use strict';

var expect = require('chai').expect,
    _ = require('lodash'),
    psc = require('../..');

describe('psc', function() {

    function prefixWithUseStrict(code) {
        return '"use strict";\n\n' + code;
    }

    it('compiles simple addition', function() {
        return expect(psc({code: '1 + 2'})).to.equal(prefixWithUseStrict('1 + 2;'));
    });

    it('compiles a function call', function() {
        return expect(psc({code: 'fib n'})).to.equal(prefixWithUseStrict('fib(n);'));
    });

    it.skip('compiles a function declaration', function() {
        return expect(psc({code: 'fun fib n -> n + 1'})).to.equal(prefixWithUseStrict('function fib(n) {return n + 1;};'));
    });

});
