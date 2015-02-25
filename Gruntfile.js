/*
 * grunt-json-fmt
 * https://github.com/MaxArt2501/grunt-json-fmt
 *
 * Copyright (c) 2015 Massimo Artizzu
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                "Gruntfile.js",
                "tasks/*.js",
                "<%= nodeunit.tests %>"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ["tmp"]
        },

        // Configuration to be run (and then tested).
        json_fmt: {
            defaults: {
                files: {
                    "tmp/random.min.json": ["test/fixtures/random.json"]
                }
            },
            pretty: {
                options: require("json-fmt").PRETTY,
                files: {
                    "tmp/random.pp.json": ["test/fixtures/random.json"]
                }
            },
            multiple: {
                files: {
                    "tmp/": ["test/fixtures/*.json"]
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ["test/*_test.js"]
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks("tasks");

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-nodeunit");

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask("test", ["clean", "json_fmt", "nodeunit"]);

    // By default, lint and run all tests.
    grunt.registerTask("default", ["jshint", "test"]);

};
