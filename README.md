# tagl

![](http://img.badgesize.io/StephanHoyer/tagl/master/index.js.svg?compression=gzip)

universal hyperscript helper for fancy syntax

## why

Writing hyperscript can be cumbersome. This might be an alternative to JSX and alike

## what

Imagine instead of

```jsx
<button className="btn">Click Me</button>
```

or this

```js
h('button.btn', 'Click Me')
```

you can write

```js
button.btn('Click Me')
```

Well thats possible with _tagl_

## how

```js
// h.js

// init tagl with your hyperscript lib, e. g. mithril.js
const m = require('mithril')
module.exports = tagl(function(tagName, classes, ...args) {
  return m([tagName, ...classes].join('.'), ...args)
})

// or react (untested)
const React = require('react')
module.exports = tagl(function(tagName, classes, props, children) {
  return React.createElement(tagName, Object.assign(
    {},
    props,
    { className: [...classes, props.className || ''].join(' ') }
    children
  ))
})
```

```js
// myView.js
const { div, span, button } = require('h.js')

div.someClass(
  span.someOtherClass('hi'),
  button.btn({ onclick: () => {} }, 'Click Me')
)
```

same in plain mithril would be

```js
const m = require('mithril')
m('div.someClass', [
  m('span.someOtherClass', 'hi'),
  m('button.btn', { onclick: () => {} }, 'Click Me'),
])
```
