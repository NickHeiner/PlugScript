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
                    src: 'test/**/*.js'
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
        'jshint:test',
        'mochaTest',
        'shell:e2e'
    ]);

};
