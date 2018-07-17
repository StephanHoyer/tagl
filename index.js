function noop(){}

module.exports = function(h) {
  return new Proxy({}, {
    get: function(_, tagName) {
      return new Proxy(noop, {
        apply(_, __, args) {
          return h(tagName, [], ...args)
        },
        get(_, className) {
          const classNames = [className]
          const proxy = new Proxy(noop, {
            get(_, className) {
              classNames.push(className)
              return proxy
            },
            apply(_, ___, args) {
              return h(tagName, classNames, ...args)
            }
          })
          return proxy
        }
      })
    }
  })
}
