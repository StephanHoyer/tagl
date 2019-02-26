'use strict'

import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'

export default [
  {
    input: './index.js',
    output: {
      file: 'tagl.js',
      exports: 'default',
      format: 'umd',
      name: 'tagl',
      sourcemap: true,
    },
    plugins: process.env.TEST ? [] : [buble(), filesize()],
  },
  {
    input: './index.js',
    output: {
      file: 'tagl.min.js',
      exports: 'default',
      format: 'umd',
      name: 'tagl',
      sourcemap: true,
    },
    plugins: [
      buble(),
      uglify.uglify({ mangle: true, compress: true }),
      filesize(),
    ],
  },
]
