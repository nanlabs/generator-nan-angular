
'use strict';

module.exports = function (grunt) {

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');

    // Project configuration.
    grunt.initConfig({
        
        // JSHint, JavaScript validation code
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: ['app/js/**/*.js']
        },

        // Less Css, compilation to CSS and minify css to prod environment
        less: {
            dev: {
                options: {
                    paths: ["app/styles/less"]
                },
                files: {
                    "app/styles/dist/dev.css": "app/styles/less/main.less"
                }
            },
            prod: {
                options: {
                    paths: ["app/dist/css"],
                    cleancss: true
                },
                files: {
                    "app/styles/dist/styles.css": "app/styles/less/styles.less"
                }
            }
        },

        watch: {
            options: {
                nospawn: true
            },
            compile: {
                files: ['app/styles/less/**/*.less'],
                tasks: ['build'],
            }
        },

        connect: {
            options: {
                port: <%= devPort %>,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            dev: {
                options: {
                    base: 'app'
                }
            }
        },

        open: {
            dev: {
                path: 'http://localhost:<%= devPort %>'
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['jshint']);

    // Compile
    grunt.registerTask('build', ['jshint', 'less:dev']);

    // Run Servers
    grunt.registerTask('server', ['build', 'connect:dev', 'open:dev', 'watch']);

};