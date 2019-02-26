#!/usr/bin/env node

const fs = require('fs')
const nopt = require('nopt')
const process = require('process')

const compile = require('./compile')

const knownOptions = {
  'exec': String,
  'output': String
}
const shorthands = {
  'e': '--exec',
  'o': '--output'
}

function exitIfError (err) {
  if (err) {
    console.error(err.message)
    process.exit(1)
  }
}

const optionFns = {
  exec: function (value) {
    fs.stat(value, function (err) {
      exitIfError(err)

      fs.readFile(value, { encoding: 'utf8' }, (err, contents) => {
        exitIfError(err)

        const code = compile(contents)
        new Function(code)()
      })
    })
  }
}

const parsed = nopt(knownOptions, shorthands)
Object.keys(parsed)
  .filter(o => o !== 'argv')
  .map(o => optionFns[o] && optionFns[o](parsed[o]))