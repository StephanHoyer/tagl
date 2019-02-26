(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.tagl = factory());
}(this, (function () { 'use strict';

  function makeTag(h) {
    function create(tag) {
      var classes = [], len = arguments.length - 1;
      while ( len-- > 0 ) classes[ len ] = arguments[ len + 1 ];

      return new Proxy(function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return h.apply(void 0, [ tag, classes ].concat( args ));
      }, {
        get: function (_, key) { return create.apply(void 0, [ tag ].concat( classes, [key] )); },
      })
    }

    return new Proxy(function (tag) { return create(tag); }, {
      get: function (comps, tag) { return create(comps[tag] || tag); },
    })
  }

  return makeTag;

})));
//# sourceMappingURL=tagl.js.map
