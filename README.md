
# Simple Console

Simple Console is nice clean command-line interface for the web.

![](screenshot.png)

[Try it out here.](http://1j01.github.io/simple-console/)

## Features

* Light and dark styles

* Command history acessible with up/down arrow keys, saved to `localStorage`

* Rich output

* Includes `aria` attributes

## Usage

Currently you have to copy
`simple-console.css`, `simple-console.js`, and `lib/octicons/`
and include in the `<head>`:
```html
<link rel="stylesheet" href="simple-console.css">
<link rel="stylesheet" href="lib/octicons/octicons.css">
```
and anywhere before you use `SimpleConsole` but probably in the `<body>`:
```html
<script src="simple-console.js"></script>
```

You should probably also include a `charset` and `viewport` like in the demo.

The dark styles take effect when a parent element contains the class `dark`.

### API

#### `new SimpleConsole(options)`

Creates a console instance.

`options.handleCommand(input)` is required.
You can handle the input however you want.
It's recommended that you 

`options.placeholder` is strongly recommended especially with the default styling as there is very little other indication of the input (when it's not focused).

`options.autofocus` should be used within an application that is primarily a console.

#### `console.element`

You must use this to add the console to the page,
e.g. `document.body.appendChild(console.element)`

#### `console.handleUncaughtErrors()`

Sets up a [`window.onerror`][] event listener and logs any uncaught error messages to the console.

#### `console.log(text)`

Logs the given text to the console and returns an `HTMLDivElement` for further manipulation (such as adding classes).

#### `console.error(text)`

Logs the given error message to the console and returns an `HTMLDivElement`.

#### `console.clear()`

Clears the console.

### TODO

* API for adding buttons beside the input

* Log elements directly

* Allow seperating command history storage with a console ID

* Optional autofocus

* Multiline input

* Autocomplete API

* Web Component

* Publish to npm and/or whatnot

[`window.onerror`]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
