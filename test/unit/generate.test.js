'use strict';

var expect = require('chai').expect,
    _ = require('lodash'),
    generate = require('../../lib/generate'),
    destreamify = require('../lib/destreamify');

describe('generate', function() {

    var runGenerate;

    beforeEach(function() {
        runGenerate = _.partial(destreamify, generate());
    });

    it('generates a literal expression', function() {
        return expect(runGenerate({
            type: 'expression',
            children: [{
                type: 'literal',
                value: '2'
            }]
        })).to.eventually.deep.equal('2');
    });

});
