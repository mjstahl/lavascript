#!/usr/bin/env node

const fs = require('fs')
const glob = require('glob')
const mkdirp = require('mkdirp')
const path = require('path')
const process = require('process')

const compile = require('./compile')
function extractFromTo (input, output) {
  fs.stat(input, (err, src) => {
    exitIf(err)
    const dest = path.resolve(__dirname, output)
    const files =
        (src.isDirectory()) ? glob.sync(`${input}/**/*.js.md`) : [output]
    files.map(f => {
      const encoding = { encoding: 'utf8' }
      fs.readFile(path.join(__dirname, f), encoding, (err, data) => {
        exitIf(err)
        const parts = path.parse(f)
        const dir = parts.dir.split(path.sep).slice(1).join(path.sep)
        const writeTo =
          path.join(path.relative(__dirname, dest), dir, parts.name)
        mkdirp(path.dirname(writeTo), (err) => {
          exitIf(err)
          const compiled = compile(data)
          fs.writeFile(writeTo, compiled, encoding, err => exitIf(err))
        })
      })
    })
  })
}
function exitIf (err) {
  if (!err) return
  console.error(err.message)
  process.exit(1)
}
if (process.argv.length < 4) {
  console.error('USAGE: lavascript <input file, dir> <output dir>')
  process.exit(1)
}

const [,, from, to] = process.argv
extractFromTo(from, to)