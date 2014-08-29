'use strict';

var expect = require('chai').expect,
    _ = require('lodash'),
    psc = require('../..');

describe('psc', function() {

    describe('successfully', function() {

        function prefixWithUseStrict(code) {
            return '"use strict";\n\n' + code;
        }

        it('compiles simple addition', function() {
            return expect(psc({code: '1 + 2'})).to.equal(prefixWithUseStrict('1 + 2;'));
        });

        it('compiles simple subtraction', function() {
            return expect(psc({code: '1 - 2'})).to.equal(prefixWithUseStrict('1 - 2;'));
        });

        it('compiles a function call', function() {
            return expect(psc({code: 'fib n'})).to.equal(prefixWithUseStrict('fib(n);'));
        });

        it('compiles a conditional', function() {
            return expect(psc({code: 'if 3 <= 5 then 1 else 0'})).to.equal(prefixWithUseStrict('(3 <= 5) ? (1) : (0);'));
        });

        it('compiles a function declaration', function() {
            return expect(psc({code: 'fun fib n -> n + 1'})).to.equal(prefixWithUseStrict('function fib(n) {return n + 1;};'));
        });

    });

    describe('failure', function() {

        it('does not allow a method to have a name that is an expression', function() {
            expect(function() {
                psc({code: 'fun fib 1 + 2 -> 4'});
            }).to.throw(/parse error/i);
        });

    });


});
