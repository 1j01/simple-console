
# Simple Console

Simple Console is nice clean command-line interface for the web.

![](screenshot.png)

## Features

* Light and dark styles

* Command history acessible with up/down arrow keys, saved to `localStorage`

## Usage

This isn't packaged up nicely as a web component or anything (yet).

Currently you would have to copy the markup from `index.html`
(changing the placeholder and label if desired),
copy `simple-console.css`, `simple-console.js`,
and `lib/octicons/`,
and define a global function `handle_command(input)`.

The dark styles take effect with the class `dark` on a parent element.

### API

Not a good API. These things are global.

#### `log(text)`

Logs the given text to the console and returns an `HTMLDivElement` for you to manipulate further (such as by adding classes).

#### `clear()`

Clears the console.
