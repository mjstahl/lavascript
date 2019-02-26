# LavaScript
LavaScript is Literate JavaScript.

## Installation

```shell
# install locally for a project
$ npm install --save-dev lavascript
```

```shell
# install globally to execute on .js.md files anywhere
$ npm install -g lavascript
```

## Getting Started

To compile a script:

`lavascript path/to/script.js.md`

To execute a script:

`lavascript -e path/to/script.js.md`

## Usage

```shell
$ lavascript [options] [file | directory]
```

Once installed, you should have access to the `lavascript` command, which can execute scripts and compile `.js.md` files into JavaScript files of the same name.

The `lavascript` command has the following options:

| **Option**                             | **Description**                              |
|----------------------------------------|----------------------------------------------|
| `-e, --exec <FILE>`                    | Compile and execute .js.md script and print the result to stdio.
| `-o, --output <DIR>`                   | Write all compiled JavaScript files to a specific directory.

## Examples

* Compile all `.js.md` files in `src` directory and write the JavaScript files to the `dist` directory.

`lavascript -o dist src`