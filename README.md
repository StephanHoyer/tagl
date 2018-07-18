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
Init *tagl* with your hyperscript lib, e. g. mithril.js.
```js
const t = tagl(function(tagName, classes, ...args) {
  return m([tagName, ...classes].join('.'), ...args)
})
```

or [react](https://flems.io/#0=N4IgzgpgNhDGAuEAmIBcJ4EMDmUC0AThJggHQBWYIANCAGYCWMVqA2qAHaYC2EaIpABbxuUGiFgB7Dohn8APEgYA3AAQMkAXgA6ITAAd9ugHzyA9EuXGQAX2qcefdFlwUqtKTIhz0dAK4cCAzSqhySkvoAFACUqsA22hyJ-oHwwRyqLlCRgrHAiaqqRPB+BBkcEADuqgAKBJIAHgCekQWFcXZthfkZ7YWQ8KiqKUHSkVLc+tLe8GDUqhNTFTIAco7zi9MyeV19C5KTW7Osm8vwa7wAuqqa+4dnu4WdvX3YEIPDAaMc4wdLM3NMjgLhAdi89i4QTc7v8ZGBWJDHNcAD7IoHYEGPdrFUrlKq1erNSJhCLzHp7PYGfRQFoAfXmtPpqkwBGwYDBFIpOLKqkEkURvHmrEu81IYpZbOiWL6z057Te8EiTNgUEwYDAII5cvanjA8AWqvVILA0JOho1SOle11+v0hKa0Iq1TqjRaJP0ZKtFIVSo25s1cS9nJVaotvDApH0fjAfJDRscUvB2ux71xqjtrqDMuoWfaVJpvtUjPmEvZgaTyaKqZ5fIFED9oeNovFrPZuaeOYrFJsicrVZKPIzzSDss5Paxo6ebUTNnEkBg3xYIAAjABmVAABls9hAXF4-CyhGIZEo4k8sng-BtvOhWUiIzSYzrDfVEEBYtIsEETCQRA4WpgW16n0E1bniNprwzfRoS-H8-1YDdLjaBg6FUSIoNUAAyTC0PgJp9AgSRUIwgBCTRbl0PUCAYDhsF0WJsLQkioNIPCCOiLVCig0D02A3ZYKgX9vBg79BL-UgwCgBhYAgSJl17VQEl6bkMgAJWPeBPyITBEAAURgXgZH5YF1lUAB5AAjcg4E00MGGwH5dniTs+m4lz2mAA1G0cIZWA-ONIEBbjP39RxVFRVQAHJIsuChJBoyJIqi2JR2iZtP1EoT-0SccODnaAbPSJc103PAN03bcHH3dAqTcM9pAvK9pD1OJVAsvx4HgaR5kseZBGXeYwH0TAMhsaFBESa9lAYfFbksCSDggABhc1Wl6IaRsSwRoCgSRIrStpLEiDafkipo9o49yToW3gzPgbaCBW0MtoYfb3PazrpFICz4B+TzpBW6SAGshhiG5jA6RT5kiwHYCByLoYAWQgfbEkTdSSHgAARMzEdIP8kAgAhImmqoS0MaJ6smJgif4CzMAs6B8oXR8OCXABWVBlwADkq3dHH4T91XqrwfBAWwRRAKSOCBlh2H56qQG0shCeUaAIkMzTT1oUoxHQYR4BA1AzDMAJ9CB7BPwOMxlfgU3uCQG2NNIVX1f0TW6toNinHAWBqP0S87Cqn3bbwJADhdiA1d292Zk9kBdf4A2jZNs2Lat7gncxsPrb8B2s4QHPuEj6ONbj7WMHwn2wD9hgA4l2g9x9rJVEqBh7qrTHbCAA)
```js
const t = tagl(function(tagName, classes, ...children) {
  let props = {}
  const prop = children[0]
  if (prop && (typeof prop !== "string") && (!prop.type)) {
    props = prop
    children = children.slice(1)
  }
  return React.createElement(tagName, Object.assign(
    {},
    props,
    { className: [...classes, props.className || ''].join(' ') },
  ), ...children)
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
