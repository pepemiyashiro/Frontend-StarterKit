# remove-try-require [![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=hughskennedy&url=http://github.com/hughsk/remove-try-require&title=remove-try-require&description=hughsk/remove-try-require%20on%20GitHub&language=en_GB&tags=flattr,github,javascript&category=software)[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Transform stream to remove require calls from inside a `try{}` statement.
Useful for modules looking for [browserify](http://browserify.org/)
compatability while using the `try/catch` optional dependency trick.

## Usage ##

[![remove-try-require](https://nodei.co/npm/remove-try-require.png?mini=true)](https://nodei.co/npm/remove-try-require)

`remove-try-require` is jsut a browserify transform stream, so you can use it
like so:

``` bash
browserify -t remove-try-require
```

Or by including it in your project's `package.json` file:

``` json
{
  "browserify": {
    "transform": [
      "remove-try-require"
    ]
  }
}
```

You can also find an AST transform that plays nice with
[ast-pipeline](http://github.com/hughsk/ast-pipeline) at
`require('remove-try-require/ast')`.

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/remove-try-require/blob/master/LICENSE.md) for details.
