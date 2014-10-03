'use strict';

/**
 * @param {Object} obj
 * @param {String} prop
 * @param {Function} getter
 * */
function lazyDef(obj, prop, getter) {
    var value;
    var isCalled = false;

    function stubify() {
        delete obj[prop];
        obj[prop] = value;
    }

    Object.defineProperty(obj, prop, {
        get: function () {
            if (!isCalled) {
                value = getter.call(obj);
                process.nextTick(stubify);
                isCalled = true;
            }

            return value;
        },
        set: function (value) {
            getter = function () {
                return value;
            };
        },
        enumerable: true,
        configurable: true
    });

    return obj;
}

module.exports = lazyDef;
