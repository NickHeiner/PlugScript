'use strict';

var expect = require('chai').expect,
    _ = require('lodash'),
    psc = require('../..'),
    destreamify = require('../lib/destreamify');

describe('psc', function() {

    var runPsc;

    beforeEach(function() {
        runPsc = _.partial(destreamify, psc());
    });

    it('compiles simple addition', function() {
        return expect(runPsc('1 + 2')).to.eventually.deep.equal('1 + 2');
    });

});
