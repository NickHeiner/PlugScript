'use strict';

var expect = require('chai').expect,
    _ = require('lodash'),
    psc = require('../..');

describe('psc', function() {

    it('compiles simple addition', function() {
        return expect(psc({code: '1 + 2'})).to.eventually.deep.equal('1 + 2');
    });

});
