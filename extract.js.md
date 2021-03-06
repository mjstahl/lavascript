# extract.js.md

We want to emulate how [Literate CoffeeScript](https://coffeescript.org/#literate) works as close as possible. Thankfully with the right markdown library it is fairly simple to get an initial version up and running.

    const marked = require('marked')
    const os = require('os')

We don't need much. At this point in time we just need a single function that takes Markdown content and extracts the specific code blocks.

    function extract (markdown) {
      const tokens = marked.lexer(markdown).filter(t => {

We want the indented code blocks because that is how Literate CoffeeScript does it. They are easier to type, and good editors keep indentation. I believe there is also an added benefit that we can use syntax highlighting for other languages, with fenced code blocks, since this project is specifically for JavaScript.

`marked` makes it really easy by differentiating the indented blocks and the fenced-in blocks -- the latter has a `lang` property, the former does not.

        return t.type === 'code' && !t.hasOwnProperty('lang')
      })

After we find all the code blocks we need to join them with line breaks. Although we have no requirements to support Windows, it is easy enough to add support. It is possible that this could be replaced with formatter like prettier.

      const newline = (os.platform() === 'win32') ? '\r\n' : '\n'
      return `${tokens.map(t => t.text).join(newline)}\n`
    }

    module.exports = extract
