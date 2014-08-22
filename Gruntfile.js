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
        }
    });

    grunt.registerTask('test', [
        'jshint:lib'
    ]);

};
