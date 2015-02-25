"use strict";

var grunt = require("grunt");

exports.json_fmt = {
    defaults: function(test) {
        test.expect(1);

        var actual = grunt.file.read("tmp/random.min.json");
        var expected = grunt.file.read("test/expected/random.min.json");
        test.equal(actual, expected, "should describe what the default behavior is.");

        test.done();
    },
    pretty: function(test) {
        test.expect(1);

        var actual = grunt.file.read("tmp/random.pp.json");
        var expected = grunt.file.read("test/expected/random.pp.json");
        test.equal(actual, expected, "should describe what the prettifying options behavior is.");

        test.done();
    },
    multiple: function(test) {
        test.expect(2);

        var actual = grunt.file.read("tmp/minimal.json");
        var expected = grunt.file.read("test/expected/minimal.json");
        test.equal(actual, expected, "should elaborate and produce more than one file correctly.");

        actual = grunt.file.read("tmp/random.json");
        expected = grunt.file.read("test/expected/random.min.json");
        test.equal(actual, expected, "should elaborate and produce more than one file correctly.");

        test.done();
    }
};
