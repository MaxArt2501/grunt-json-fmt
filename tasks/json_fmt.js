/*
 * grunt-json-fmt
 * https://github.com/MaxArt2501/grunt-json-fmt
 *
 * Copyright (c) 2015 Massimo Artizzu
 * Licensed under the MIT license.
 */
 "use strict";
 
var path = require("path"),
    JSONFormatter = require("json-fmt");

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask("json_fmt", "Grunt plugin for JSON formatting with json-fmt", function() {
        var options = this.options();

        // This operation is necessary depending on the environment, because
        // Grunt replaces linefeed sequences in options trying to compile
        // templates.
        // JSONFormatter's options include the newline property, which may get
        // normalized using this.options. If the plugin detects a string option
        // has just been normalized, the raw value is used instead.
        // This doesn't prevent to use templates, but the normalization won't
        // be neutralized though.
        Object.keys(options).forEach(function(optname) {
            var option = options[optname], rawopt;
            if (typeof option === "string") {
                rawopt = grunt.config.getRaw([ this.name, this.target, "options", optname ]);
                if (rawopt !== option && grunt.util.normalizelf(rawopt) === option)
                    options[optname] = rawopt;
            }
        }, this);

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            var destpath = f.dest,
                isFullPath = !grunt.file.isDir(f.dest),
                fmt = new JSONFormatter(options),
                src = f.src.filter(function(filepath) {
                    return grunt.file.exists(filepath);
                });

            if (src.length > 1) {
                // If there's more than one source file, destpath can only be
                // a directory
                if (isFullPath)
                    destpath = path.dirname(destpath);
                isFullPath = false;
            }

            src.forEach(function(filepath) {
                if (!grunt.file.exists(filepath)) return;

                var content = grunt.file.read(filepath),
                    outpath = isFullPath ? destpath
                            : path.join(destpath, path.basename(filepath));
                try {
                    content = fmt.reset().end(content).flush();
                    grunt.file.write(outpath, content);

                    // Print a success message.
                    grunt.log.ok("File JSON \"" + filepath + "\" elaborated.");
                } catch (e) {
                    grunt.log.error(e.message);
                }
            });
        });
    });

};
