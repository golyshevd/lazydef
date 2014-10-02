lazydef [![Build Status](https://travis-ci.org/golyshevd/lazydef.svg)](https://travis-ci.org/golyshevd/lazydef)
========

Lazy getter helper

#Usage
```js
var lazyDef = require('lazydef');
var obj = {};

function doSomethingSoHard () {
    return 42;
}

lazyDef(obj, 'foo', doSomethingHard);

//  foo will be executed once
assert.strictEqual(obj.foo, 42);
assert.strictEqual(obj.foo, 42);
```

---------
License [MIT](LICENSE)
