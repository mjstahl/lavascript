# LavaScript is Literate JavaScript.

As a programmer who works remotely, two skills are more important than others: written communication and programming itself. I exercise the later far more than the former. And because of that, my love for all things Knuth, and a raging jealousy of [Literate CoffeeScript](https://coffeescript.org/#literate), I wrote LavaScript. LavaScript is [Literate Programming](https://en.wikipedia.org/wiki/Literate_programming) for JavaScript.

## What is Literate Programming?

A pretty good and concise description of Literate Programming is from this [blog](http://badassjs.com/post/39952923831/badass-js-roundup-literate-coffeescript) describing Literate CoffeeScript which (as stated in the above paragraph) was the predominant inspriation for LavaScript.

> A so-called literate program is a program that contains both an explanation of the logic in plain English interspersed with snippets of code that the machine can actually run.

Literate Programming inverts the relationship between comments and code.

## Examples

### Literate Programming

* https://github.com/jashkenas/coffeescript/blob/master/src/sourcemap.litcoffee
* https://gitlab.com/randomenduser/dotfiles/blob/master/.emacs.d/emacs.org
* https://gist.github.com/jashkenas/3fc3c1a8b1009c00d9df

### Literate JavaScript

* https://github.com/mjstahl/lavascript-loader/blob/master/loader.js.md
* https://github.com/mjstahl/lavascript/blob/master/bin.js.md
* https://github.com/mjstahl/lavascript/blob/master/extract.js.md

## Advantages

In the Wikipedia article on Literate Programming, Donald Knuth describes its [advantages](https://en.wikipedia.org/wiki/Literate_programming#Advantages) as (emphasis is mine):

> ... provides higher-quality programs, since it **forces programmers to explicitly state the thoughts behind the program**, making poorly thought-out design decisions more obvious.

> The resulting documentation **allows the author to restart his own thought processes at any later time**, and allows other programmers to understand the construction of the program more easily.

How the above differs from conventional comments is so important, I thought it should be isolated from rest of the paragraph for emphasis.

> This differs from traditional documentation, in which a programmer is presented with source code that follows a compiler-imposed order, and must decipher the thought process behind the program from the code and its associated comments.

The above is not as bad as it used to be but I think the key take away is: we still write to satisfy the machine first, even though many of us agree that source code is read 10x more than it is written.

## Installation

```shell
# install locally for your project
$ npm install --save-dev lavascript
```

```shell
# install globally to execute on .js.md files anywhere
$ npm install -g lavascript
```

## Usage

```shell
$ lavascript [input file or dir] [output dir]
```

Once installed, you should have access to the `lavascript` command, which can execute scripts and compile `.js.md` files into JavaScript files of the same name.

## Ecosystem

* [Webpack Loader](https://npm.im/lavascript-loader)
* [StealJS Plugin](https://npm.im/steal-lavascript)
* [Browserify Transform](https://npm.im/lavaify)
* [VS Code Extension](https://github.com/mjstahl/vscode-lavascript) (Work In Progress)