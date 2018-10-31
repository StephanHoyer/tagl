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

Init _tagl_ with your hyperscript lib, e. g. [mithril.js](https://flems.io/#0=N4IgzgpgNhDGAuEAmIBcICGAHLA6AVmCADQgBmAljEagNqgB2GAthGiLgBbzNQkiwA9g0Qj2AHiQUAbgAIKSALwAdTDlUA+cQHop0jSAC+xRizbp4GAOZQAtMwrxOAJyoEipISIhj0XsPCynLKKspY2ABRkAK4MCBTCEeEAcmbEsrBQGGCQYOm4BRjOVmAAlLLAygyyss4Q8NHO1cwRtClpsgW4mdm5ALoEghQMEQDkuKOl+YXFZVWGpfyQMPHCNCAATKgbRiYgTKzs2HiE-F6i8Oz+gcCyAEbR8PDC6XrpnACM6WBYGNWGISCVSq11k0goEAA7oCIuVFBpZHpcGBBKwAMJZHIRKo1T5jTjQKCCSbEHGImTY6o1WQ-P5jACeglkJLJNVpDGRqIgAHknBBnBjeviKCyqVMyXpKdT7o9nhy7vARpUqdLhJkKLAANaoWSwkIIjAwZzwfGE4mlVmyYzMyGcDDwSZki0MZ1VZi4ZiCWIm47pW7gqFWxaeVFYKj8tAMaJQKCkZZweAJBjrD4ABlQAE5dqZDuhujkzsILuwjH1SFBhpqaPR9mZ2A4nK4+KRGnx0Nx4FgwKhtNpYlhNVZuqjtA2XFQAAIfXDTgBso8c46g7n48HpWHM4Fgriwl2MOc34WbIFb7A7XZ7fYYA6HQmY2iPU5nuA22jvno5p1Ia437DA24oXdS1IA5D2sKBZEhRdZDHJsjCAA).

```js
const t = tagl(function(tagName, classes, ...args) {
  return m([tagName, ...classes].join('.'), ...args)
})
```

or [react](https://flems.io/#0=N4IgzgpgNhDGAuEAmIBcICGAHLA6AVmCADQgBmAljEagNqgB2GAthGiLgBbzNQkiwA9g0Qj2AHiQUAbgAIKSALwAdTDlUA+cQHop0jSAC+xRizbp4GAOZQAtACcIGBASKkhIiGPQew8WZyyirKWNgAUZACuDAgUwmGhAHJmxLKwUBhgkGCpuHmwnFRIjgwAlLLAygyysjD+WPaCWGBBFYZVNb71jVitBUUltAAMALod8mSyYQ1NsgBkc1PwAJ5YEIKTM70AhIrBqn72FAxWquULU9tbuCtrpeWV1TWyWy3BW+OdhVDFXn3fvwYuDAUAosAgYQAjKVxu0no54JF7NUAEpOFywRwYRAAURgrBECWsyVYqQA8gAjfBweC4TJgChWBhhT5tYis17sp41YBpDJZEkQVCyWh5XDpekQHIvHpgcX8sCC2QAH2VsgA5OqRgRBMcwuqNeVjONSrl8gCSjCGIYrfxIDBYsIaCAAOyoABMABYjCYQExWOxsHhCPwPKJ4OwuhVZBTIvB4MJUnpUpxIakwFgMNVDK1OFUqlHpBQIAB3Vp6YGCVgAYQVLKeqf1nGgUEE6tN4z09eesgzWf1y0Ehq5Pb7QLAVYgZPgzfstfpTYo7ZHsg7Ty7rNj8eEuAp8GZjx7NWEtbBAGthWFyooNLIMDB7PAmy221ae8YNSXONj2yaqlaqjRZx4AAETJABZXASiQCB7DCItS1SINSlDKssCoWD2ApDAKWgO1oBpOIGGdSFUCGH1TADdBxSyVDPG8EAjBGUhQQYM8aHoP0zHYLEXBg6RoCaAlaRDUgkT4dBuHgZpUG0bRoiwM8rHFKttF4+B5OYJA1PRWl+MErBhNcfhbnMcBMQoLAI2MSizPU2wkCrXB9NbQyvBEtwQHE9gpJkuSFKUlTmB04CHNUyItJChAwuYZyIAE1yjNEkBTPYMALKsiiuKolLrD4MT7AkkBfLAWT5IYRTlKEYLQigAABSFcEa91tGq5gd2S1L0HSo5MsMZjsrM2rZBLCgZ1kdSjCAA)

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
