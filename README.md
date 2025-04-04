# Use your Tailwind CSS config in PHP

[![npm (scoped)](https://img.shields.io/npm/v/@vendeka/tailwind-config-php?style=for-the-badge&color=166534)](https://www.npmjs.com/package/@vendeka/tailwind-config-php)
[![Supports Tailwind CSS v3](https://img.shields.io/badge/Tailwind_CSS-v3-blue?style=for-the-badge&color=075985&link=https%3A%2F%2Fv3.tailwindcss.com%2F)](https://v3.tailwindcss.com/)
[![GitHub Repo stars](https://img.shields.io/github/stars/vendeka-nl/tailwind-config-php?style=for-the-badge&color=b45309)](https://github.com/vendeka-nl/tailwind-config-php)

Seamlessly bridge the gap between Tailwind CSS and PHP by converting your Tailwind CSS configuration into a PHP-compatible format.
Supports both JavaScript and TypeScript configurations.

## Installation

```sh
npm install @vendeka/tailwind-config-php
```

## Usage

Browse to the directory where your [Tailwind CSS config file](https://v3.tailwindcss.com/docs/installation) is located and execute:

```sh
npx tw2php
```

Now you can use the resolved config in your PHP as an object (or an array).

```php
$tailwind = require 'tailwind.config.php';
$tailwind->theme->colors->gray->{500};
```

By default the command reads `tailwind.config.js`, writes to `tailwind.config.php`, and exports the complete Tailwind CSS configuration.
Functions such as plugins are replaced with `null`.

Please remember that the PHP file does not automatically update.

### Input file

By default it reads from `tailwind.config.ts` or `tailwind.config.js`. You can override the file name using the `--config` option (or the `-c` shorthand).

```sh
npx tw2php --config tailwind.custom.js
```

### Output file

By default it writes to `tailwind.config.php`. You can override the output file name using the `--output` option (or the `-o` shorthand).

```sh
npx tw2php --output config/tailwind.php
```

### Output format

You can specify the output format of the output using the `--format` option.
Possible values are `array` and `object` (default: `object`).

```sh
npx tw2php --format array
```

### Included properties

This package outputs your complete Tailwind CSS configuration by default.
To pick only a hand full of option, use the `--properties` option (or the `-p` shorthand).
It supports a comma separated list of keys.

```sh
npx tw2php --properties "theme.colors,prefix"
npx tw2php --properties "theme.colors" --properties "prefix"
```
