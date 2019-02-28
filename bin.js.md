    const chalk = require('chalk')
    const fs = require('fs')
    const glob = require('glob')
    const mkdirp = require('mkdirp')
    const path = require('path')
    const process = require('process')

    const extract = require('./extract')
    const pkg = require('../package')

The goal at this point in the project is to be self evaluating. By that I mean, use the project to write the project. With that, there is only one feature we have to support, _read `js.md` files from one directory and ouput the resulting `.js` files to another directory_.

    function extractFromTo (input, output) {
      fs.stat(input, (err, src) => {
        exitIf(err)
        const dest = path.resolve(output)

Glob is by far the simplist way to get a filtered recursive list of files from a particular location.

        const files =
            (src.isDirectory()) ? glob.sync(`${input}/**/*.js.md`) : [output]

For each file found we need to:

Read the file.

        files.forEach(f => {
          const parts = path.parse(f)

If the input and output directories are not the same, we do not want to read any files from the output directory.

          if (input !== output && parts.dir.includes(output)) return

          const encoding = { encoding: 'utf8' }
          fs.readFile(path.join(input, f), encoding, (err, data) => {
            exitIf(err)

Get the subdirectory of the file, because we want to recreate the same tree in the destination directory.

            const dir = parts.dir.split(path.sep).slice(1).join(path.sep)

Join the relative path our current executing directory and the dest directory, with the name of the file sans the extension. This is why they are `.js.md` files, no extra processing to strip off the extension (not really, but it worked out nicely that way).

            const writeTo =
              path.join(path.relative(input, dest), dir, parts.name)

Use `mkdirp` to create the new file, otherwise we would have to create each new subdirectory by hand. No thank you, I will let someone else do that for me.

            mkdirp(path.dirname(writeTo), (err) => {
              exitIf(err)

Extract the JS code from the markdown file.

              const extracted = extract(data)

Write the new JS file to its final destination

              fs.writeFile(writeTo, extracted, encoding, err => {
                exitIf(err)
                console.log(`${f} -> ${chalk.green(writeTo)}`)
              })
            })
          })
        })
      })
    }

I prefer to use the async versions of node APIs because I have a illogical aversion to try/catch statements -- even though it makes the code look like callback hell. With that said, we need to exit and log errors when they are encountered.

And since we are doing this more than twice, let's just move it out to its own function.

    function exitIf (err) {
      if (!err) return
      console.error(err.message)
      process.exit(1)
    }

Nothing surprising here. We expect two arguments, so we need an `argv` length of at least 4. The first two being `node` and the executing file, the 2nd and 3rd arguments being our input and output directories.

    if (process.argv.length < 4) {
      console.error('USAGE: lavascript <input file, dir> <output dir>')
      process.exit(1)
    }

    const [,, from, to] = process.argv
    extractFromTo(from, to)
