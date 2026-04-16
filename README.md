# console-in-page-js

Developer Console Visualizer - a script that duplicates the output from the browser console directly to your web page.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 📋 Description

This script intercepts console.log, console.warn, console.error, console.debug, and console.assert methods and outputs them directly onto the webpage. Perfect for debugging, demonstrations, or creating interactive code playgrounds.

## ✨ Features

- 💎 No dependencies, pure vanilla JS
- 📍 Flexible positioning (4 corners)
- 🔄 Auto-scroll with intelligent lock
- 🚀 Auto-open option
- 📋 One-click copy all console output
- 🎨 Dark/Light theme support

## 📦 Installation

### Basic usage

```html
<script src="console-in-page.js"></script>
```

### With configuration

```html
<script 
  src="console-in-page.js" 
  data-position="top-right"
  data-theme="light"
  data-auto-open="true"
  data-button-color="dark">
</script>
```

## ⚙️ Configuration

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| data-position | top-left, top-right, bottom-left, bottom-right | top-left | Console panel position |
| data-auto-open | true, false | false | Auto-open console on load |
| data-theme | dark, light | dark | Color theme |
| data-button-color | dark, light | light | Toggle button color scheme |

## 🚀 Usage Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Console Demo</title>
</head>
<body>
  <script src="console-in-page.js" data-position="bottom-right" data-theme="dark" data-auto-open="true"></script>
  
  <button onclick="console.log('Hello World!')">Test Log</button>
  <button onclick="console.warn('Warning message')">Test Warning</button>
  <button onclick="console.error('Error occurred')">Test Error</button>
  <button onclick="console.debug('Debug info')">Test Debug</button>
</body>
</html>
```

## 📝 Notes

- The script creates a fixed-position UI element that overlays your page

## 📄 License

MIT License

Copyright (c) 2026 @valerrkaaa

## 🔗 Links

- [GitHub Repository](https://github.com/valerrkaaa/console-in-page-js)
- [Report Issue](https://github.com/valerrkaaa/console-in-page-js/issues)
