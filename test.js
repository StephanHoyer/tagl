const o = require('ospec')
const tagl = require('.')

o('basic usage', function(done) {
  function h(tagname, classes, ...args) {
    o(tagname).equals('div')
    o(classes).deepEquals([])
    o(args).deepEquals([1, 2])
    done()
  }
  const { div } = tagl(h)
  div(1, 2)
})

o('basic usage', function(done) {
  function h(tagname, classes, ...args) {
    o(tagname).equals('span')
    o(classes).deepEquals(['foo'])
    o(args).deepEquals([{}, 'huhu', 'haha'])
    done()
  }
  const { span } = tagl(h)
  span.foo({}, 'huhu', 'haha')
})
