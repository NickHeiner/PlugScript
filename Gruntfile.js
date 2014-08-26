'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            options: {
                node: true
            },

            lib: {
                files: {src: 'lib/**/*.js'}
            }
        },

        mochaTest: {
            unit: {
                files: {
                    src: 'test/unit/**/*.js'
                }
            }
        },

        shell: {
            e2e: {
                command: 'bin/psc test/fixtures/fib.pluggie'
            }
        }
    });

    grunt.registerTask('test', [
        'jshint:lib',
        'mochaTest',
        'shell:e2e'
    ]);

};
