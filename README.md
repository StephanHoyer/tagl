# tagl

[![Greenkeeper badge](https://badges.greenkeeper.io/StephanHoyer/tagl.svg)](https://greenkeeper.io/)
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

Init _tagl_ with your hyperscript lib, e. g. mithril.js.

```js
const t = tagl(function(tagName, classes, ...args) {
  return m([tagName, ...classes].join('.'), ...args)
})
```

or [react](https://flems.io/#0=N4IgzgpgNhDGAuEAmIBcICGAHLA6AVmCADQgBmAljEagNqgB2GAthGiLgBbzNQkiwA9g0Qj2AHiQUAbgAIKSALwAdTDlUA+cQHop0jSAC+xRizbp4GAOZQCRUkJEQx6MgFcGCCsNkNBgrAAKAEpZYENlBkj3T3hvBllLG0DOUOBI2VkAJwh4NyyEhggAd1kABSzBAA8AT0CMzLDjBsz0hMbMyHhUWRivYUChZixhZ3gwYlkhkaKRADkzSenRkTSWjqnBYZXx2mXZ+AXWAF1ZRU3tg-XM5vaOq1yevriB-bGJxOsjiDW7jaTvmcLjN3rQAWZTgAfSGfKzfa6NHJ5Aq+ErlSq1QJ+AKTNobDbYLBQOoAfUmJLJsgwWSsYF++PxSPyCU4gXBrEmtGOk1wvOptOCCI6twZjQe8EClNgUAwYDA33posajjA8CmMrl3zAQL2GvlEKFGxVaqwGJqQKKpQq1Tq2KwuMN+PFkqWeoVYUdDOlsv1rDAuCwbjArO9mrMgr+SsRuWZslNNs9wuIicahOJLtkFMm-LpHsjUeyMZRrPZEFdPq1PL5NLpKZuyfz+MMEYLheRCXjtU9IoZzYRPZuDQjhn4kBg-QYNBAAEYAMyoAAMRhMICYrHYSSgAFochgEHZ+I5RPB2MbZJwgZvAs94myvot1T6IB9ebhYJwqEgcgxFTATZUsG1c5wgaM94ywIF30-b9aAXY4GgoMhZECcDZAAMjQ5D4BqLAIEEJDUIAQkUc5VFVLIKAYKxVFCDDkMI8DcGw3DgkVTJwKAuMAPWKCoC-ZxII-Pjv1wMAoAoWAIECacW1kCJ2iZFEACUID3eA313RAAFEYFYEQ7zhB8AHkACN8DgdSfQoKwGHqP5wgbDoOMcxpgEfMNWB6WhX1DSAPg4t83TMWRoVkAByMLjgIQRKMCMLwtCHtgirN8hP4n9Ij7BhR2gCz4inOdFy3BdF2XUx13QQkDwcYRj1PYRVTCWQTLceB4GESY9EmThp0mMAsAwBJDCBThIjPaQKDRc49FErYIAAYT1OzOgG2yws4aAoEEMLkoaPRAn6wa4pqbbWJcw6GFm1gjPgDaskWn04o-HaXJatrhFwEz4FstzhEWiSAGsehCM4NCaOTJjC-7YABsLIYAWQgHbIgjFS1IAESM+HcG-JAICyQIJpKbMcGCQ8tiwKh8fYEyMBM6AcvHF5J3YABWVBpwADjK1czHYN85XJpwXBAIxuRAcSGABmh6F5iqQF3fc8ekaAAj09TCH4fI+HQbh4EA1BtG0DwsABqw3y2bRFfgY3mCQK3VKViAVa2rB1eqkBmPMcBYAorAT2McrvetrckC2XBldVt2xg97X2D1g2jZNs2LeYB21NDy23Dt9OEEz5gI+dqP3c10gvfYMBfYof2xdINdvc3WRigoW7CzUowgA)

```js
const t = tagl(function(tagName, classes, ...children) {
  let props = {}
  const prop = children[0]
  if (prop && typeof prop !== 'string' && !prop.type) {
    props = prop
    children = children.slice(1)
  }
  return React.createElement(
    tagName,
    Object.assign({}, props, {
      className: [...classes, props.className || ''].join(' '),
    }),
    ...children
  )
})
```

```js
// myView.js
const { div, span, button } = t

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

## components

There are two ways to create and use components. One global and one local. Use global components for general reusable widgets like date picker or dropdowns and alike.

```js
// define it and set it on the tagl instance

// `myDatePicker` must be a component definition that is supported by your vdom library
// it will be used instead of the tag name
t.datePicker = myDatePicker

// use it

const { div, datePicker } = t

div(
  'choose date:',
  datePicker({
    value: new Date(),
  })
)
```

Sometimes you just need sub-state at a specific point and you don't want to create a globaly available component. In this case you can use local components.

```js
const { div } = t

// define it and store it in a variable
// `myDatePicker` must be a component definition that is supported by your vdom library
// it will be used instead of the tag name
const myLocalComponent = t(localComponent)

// use it
div(
  'fancy stuff:',
  myLocalComponent(
    {
      someAttrs: 'someValue',
    },
    'some',
    'child',
    'content'
  )
)
```
