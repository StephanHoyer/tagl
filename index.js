export default function makeTag(h) {
  function create(tag, ...classes) {
    return new Proxy((...args) => h(tag, classes, ...args), {
      get: (_, key) => create(tag, ...classes, key),
    })
  }

  return new Proxy(tag => create(tag), {
    get: (comps, tag) => create(comps[tag] || tag),
  })
}
