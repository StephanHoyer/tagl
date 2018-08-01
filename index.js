function noop() {}

module.exports = function(h) {
  function createProxy(tagName) {
    return new Proxy(noop, {
      apply: (_, __, args) => h(tagName, [], ...args),
      get: (_, className) => {
        const classNames = [className]
        const proxy = new Proxy(noop, {
          get(_, className) {
            classNames.push(className)
            return proxy
          },
          apply(_, ___, args) {
            return h(tagName, classNames, ...args)
          },
        })
        return proxy
      },
    })
  }

  return new Proxy(component => createProxy(component), {
    get: (components, tagName) => createProxy(components[tagName] || tagName),
  })
}
