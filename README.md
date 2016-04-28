
# Simple Console

Simple Console is nice clean command-line interface for the web.
[Check out the demo!](http://1j01.github.io/simple-console/)

![](screenshot.png)


## Features

* Light and dark styles

* Easy rich HTML output

* Command history accessible with up/down arrow keys, saved to `localStorage`

* Command history is also accessible on mobile devices with a menu

* Doesn't create a duplicate history entry if you re-enter the last command

* Lets you delete history entries with <kbd>Shift+Delete</kbd>

* Includes [`aria`][] attributes, which is something you should care about


## Usage

Download `simple-console.css` and `simple-console.js`,
and include in the `<head>`:
```html
<link rel="stylesheet" href="simple-console.css">
```
and anywhere before you use `SimpleConsole` but probably in the `<body>`:
```html
<script src="simple-console.js"></script>
```

You should probably also include a `charset` and `viewport` like in the demo.

The dark styles take effect when a parent element contains the class `dark`.

To make the console properly take up the entire page, use:
```css
html,
body {
    height: 100%;
    margin: 0;
    display: flex;
    flex: 1;
}
```


### API

#### `new SimpleConsole(options)`

Creates a console instance.

`options.handleCommand(input)` is required.
You can handle the input however you want.
It's recommended that you catch errors and log them with `console.error`.

`options.placeholder` is strongly recommended especially with the default styling as there is very little other indication of the input (when it's not focused).

`options.autofocus` should be used within an application that is primarily a console.

`options.storageID` should be used to separate the command history of different consoles.

**Note:** The `SimpleConsole` object is referred to as `console` below, but you should probably give it a different name so it doesn't conflict with the global console object.

#### `console.element`

You must use this to add the console to the page,
e.g. `document.body.appendChild(console.element)`

#### `console.input`

The console's `<input>` element.
Useful for adding controls/widgets
e.g. `console.input.parentElement.appendChild(button)`

#### `console.handleUncaughtErrors()`

Sets up a [`window.onerror`][] event listener and logs any uncaught error messages to the console.

#### `console.log(text)`

Logs the given text to the console and returns an `HTMLDivElement` for further manipulation (such as the addition of classes).

#### `console.log(element)`

Logs the given element to the console and returns an `HTMLDivElement`.

#### `console.logHTML(html)`

Logs the given HTML to the console and returns an `HTMLDivElement`.

#### `console.error(message)`

Logs the given error message to the console and returns an `HTMLDivElement`.

#### `console.clear()`

Clears the console.


### TODO

* `warn`, `info` etc. matching the [Chrome](https://developer.chrome.com/devtools/docs/console-api) and [Firefox](https://developer.mozilla.org/en-US/docs/Web/API/Console) console APIs

* Solarized and retro themes

* Position the command history menu better?

* Provide an API for adding buttons and menus?

#### Packaging

* Rename project because "simple-console" is taken on npm. I'm thinking "cute-console"...

* Web Component?

#### Input

* Multiline input (i.e. `textarea`)

* Autocomplete (`aria-autocomplete="inline"`)

* Syntax highlighting

* Should probably just let you use your own input component

#### FIXME

* Fix duplicate reading of `aria-label` and `placeholder` by some screenreaders

* Fix input styling in Firefox with `font: inherit` and something else to make stuff line up perfectly

* Fix pixel rounding issues in Edge

* Fix flickering caused by scrolling to the bottom on a timeout, mainly in Chrome and Edge but also very rarely in Firefox (should try `requestAnimationFrame`)


### License

The MIT License (MIT)
Copyright (c) 2016 Isaiah Odhner

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[`aria`]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
[`window.onerror`]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
