# grunt-json-fmt

> Grunt plugin for JSON formatting with json-fmt

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-json-fmt --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-json-fmt");
```

## The "json_fmt" task

### Overview
In your project's Gruntfile, add a section named `json_fmt` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    json_fmt: {
        options: {
            // Task-specific options go here.
        },
        your_target: {
            // Target-specific file lists and/or options go here.
        },
    },
});
```

### Options

This plugin accepts the same options of the `JSONFormatter` class used internally. See [`json-fmt`'s page](https://github.com/MaxArt2501/json-fmt) for more informations.

### Usage Examples

Elaborates the given JSON files and writes the results inside the `dest/` directory, using the `JSONFormatter` default minifying options:

```js
grunt.initConfig({
    json_fmt: {
        files: {
            "dest/": [ "src/foo.json", "src/bar.json" ],
        }
    }
});
```

An explicit destination file name can be given, but it will be used only if the source files are just one:

```js
grunt.initConfig({
    json_fmt: {
        files: {
            "dest/output.json": [ "src/input.json" ],
        }
    }
});
```

Options can be given to override the default minification options:

```js
grunt.initConfig({
    json_fmt: {
        options: {
            newline: "\r\n",
            indentObject: true
        }
        files: { ... }
    }
});
```

## Notes

In Grunt, string options have usually their linefeed sequences normalized via `grunt.util.normalizedlf` during the process of option template rendering. This is a problem especially with `newline`, but the plugin is smart enough to detect if the option is the result of just a newline normalization, using the raw value instead.

Yes, this readme file has been generated with the `gruntplugin` template, which also gave the basis for everything else. I regret nothing.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License

MIT. See [LICENSE](LICENSE) for more details.