# Use your Tailwind CSS config in PHP

![npm (scoped)](https://img.shields.io/npm/v/@vendeka/tailwind-config-php)

Ever needed to use your Tailwind CSS configuration in PHP? With this package you can!

The package is developed and maintained by [Vendeka](https://www.vendeka.nl/), a company from the Netherlands.


## Installation

```sh
npm install @vendeka/tailwind-config-php
```


## Usage

Browse to the directory where your [Tailwind CSS config file](https://tailwindcss.com/docs/configuration/) is located and execute:

```sh
npx tw2php
```

By default the command reads `tailwind.config.js`, writes to `tailwind.config.php`, and exports the complete Tailwind CSS configuration. Functions such as plugins are replaced with `null`.


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


### Included properties

This package outputs your complete Tailwind CSS configuration by default. To pick only a hand full of option, use the `--properties` option (or the `-p` shorthand). It supports a comma separated list of keys.  

```sh
npx tw2php --properties "theme.colors,prefix"
npx tw2php --properties "theme.colors" --properties "prefix"
```


## Usage in PHP

Now you can use the resolved config in your PHP as an object.

```php
$tailwind = require 'tailwind.config.php';
$tailwind->theme->colors->gray->{500};
```

Please remember that the PHP file does not automatically update.
