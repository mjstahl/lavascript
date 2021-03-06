#!/usr/bin/env node

const chalk = require('chalk')
const fs = require('fs')
const glob = require('glob')
const mkdirp = require('mkdirp')
const path = require('path')
const process = require('process')

const extract = require('./extract')
function extractFromTo (input, output) {
  fs.stat(input, (err, src) => {
    exitIf(err)
    const dest = path.resolve(output)
    const files =
        (src.isDirectory()) ? glob.sync(`${input}/**/*.js.md`) : [output]
    files.filter(f => !f.includes('node_modules')).forEach(f => {
      const parts = path.parse(f)
      if (input !== output && parts.dir.includes(output)) return

      const encoding = { encoding: 'utf8' }
      fs.readFile(path.join(input, f), encoding, (err, data) => {
        exitIf(err)
        const dir = parts.dir.split(path.sep).slice(1).join(path.sep)
        const writeTo =
          path.join(path.relative(input, dest), dir, parts.name)
        mkdirp(path.dirname(writeTo), (err) => {
          exitIf(err)
          const extracted = extract(data)
          fs.writeFile(writeTo, extracted, encoding, err => {
            exitIf(err)
            console.log(`${f} -> ${chalk.green(writeTo)}`)
          })
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
