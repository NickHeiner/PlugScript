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
            },

            test: {
                files: {
                    src: ['test/**/*.js', '!test/sandbox/**/*.*']
                },
                options: {
                    globals: {
                        it: true,
                        describe: true,
                        beforeEach: true
                    }
                }
            }
        },

        mochaTest: {
            unit: {
                files: {
                    src: ['test/unit/**/*.js', 'test/config/**/*.js']
                },
                options: {
                    reporter: 'spec'
                }
            }
        },

        shell: {
            e2e: {
                command: 'bin/psc -f test/fixtures/fib.pluggie > test/sandbox/fib.js && test/sandbox/run-fib'
            }
        }
    });

    grunt.registerTask('test', [
        'jshint:lib',
        'jshint:test',
        'mochaTest',
        'shell:e2e'
    ]);

};
