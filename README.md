# X

[![jsDelivr](https://img.shields.io/badge/on-jsDelivr-brightgreen.svg?style=flat)](https://cdn.jsdelivr.net/gh/thexproject/x/dist/)
[![License](https://img.shields.io/github/license/thexproject/x.svg?style=flat)](https://github.com/thexproject/x/blob/master/LICENSE)
[![Cirrus CI](https://api.cirrus-ci.com/github/thexproject/x.svg?branch=master)](https://cirrus-ci.com/github/thexproject/x)
[![Documentation](https://img.shields.io/badge/documentation-here-blue.svg?style=flat)](https://github.com/thexproject/x/wiki)


*A simple DOM manipulation library that comes with a templating engine and an easy-to-use AJAX function.*

## About

This library actually has three parts:

1. X, which is a lightweight jQuery-inspired DOM manipulation library.
2. xAct, which is a simple templating engine built for simpler websites.
3. xJax, which is really just a wrapper around the `fetch` api to make it slightly simpler.

## Code Examples

Here's a code example for X:
```javascript
x("<button>").click(() => {
  console.log("The button was clicked!");
}).text("Click me!").prependTo("body");
```

Here's a code example for xAct:
```html
<div id="container">
  << for (let i = 0; i < 5; i++) { >>
    <strong>This is element number << i >>.</strong>
    <br>
  << } >>
</div>
```

To make it work, just use:
```javascript
xAct("#container");
```

And here's some code for xJax:
```javascript
x("<button>").click(async () => {
  let data = await xJax("https://example.com/");
  x("body").append(`
    <div id="loaded">
      ${data}
    </div>
  `);
}).text("Click to load content.").prependTo("body");
```

## Development

Cirrus CI will automatically test X. Below is how to do that manually for development purposes.

### Testing

Unit tests are run using [Jest](https://jestjs.io/). Make sure to update the appropriate file in `test` when adding new functionality to X. `dom.js` contains tests for the main X DOM manipulation library, `ajax.js` contains tests for xJax, and `templating.js` contains tests for xAct.

Run the tests like this:
```
$ npm test
```

### Building

We use [Gulp](https://gulpjs.com/) to build X. It will output two files, `x.js` and `x.min.js` to the `dist/` directory. `x.js` is just the original source code copied over, and `x.min.js` is the source code uglified.

Manually run Gulp like this:
```
$ npm run build
```

### Both

To both build and test X, run this command:
```
$ npm run both
```

**Before committing changes make sure to run this!** The CI will check whether or not you did, and PRs will fail if you didn't.