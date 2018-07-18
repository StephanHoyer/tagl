const o = require('ospec')
const tagl = require('.')

o.spec('basic usage', () => {
  o('without classes', function(done) {
    function h(tagname, classes, ...args) {
      o(tagname).equals('div')
      o(classes).deepEquals([])
      o(args).deepEquals([1, 2])
      done()
    }
    const { div } = tagl(h)
    div(1, 2)
  })

  o('with classes', function(done) {
    function h(tagname, classes, ...args) {
      o(tagname).equals('span')
      o(classes).deepEquals(['foo'])
      o(args).deepEquals([{}, 'huhu', 'haha'])
      done()
    }
    const { span } = tagl(h)
    span.foo({}, 'huhu', 'haha')
  })
})

o.spec('components', () => {
  o('without classes', function(done) {
    function myComponent() {}
    function h(tagname, classes, ...args) {
      o(tagname).equals(myComponent)
      o(classes).deepEquals([])
      o(args).deepEquals([1, 2])
      done()
    }
    t = tagl(h)
    t.myCmp = myComponent
    const { myCmp } = t
    myCmp(1, 2)
  })

  o('with classes', function(done) {
    function myComponent() {}
    function h(tagname, classes, ...args) {
      o(tagname).equals(myComponent)
      o(classes).deepEquals(['foo'])
      o(args).deepEquals([{}, 'huhu', 'haha'])
      done()
    }
    t = tagl(h)
    t.myCmp = myComponent
    const { myCmp } = t
    myCmp.foo({}, 'huhu', 'haha')
  })
})
