# Use your TailwindCSS config in PHP

![npm (scoped)](https://img.shields.io/npm/v/@vendeka/tailwind-config-php)

## Installation 
```
npm install --global @vendeka/tailwind-config-php
```

## Usage

Browse to the directory where your [TailwindCSS config file](https://tailwindcss.com/docs/configuration/) is located and execute:

```
tw2php
```

By default it read `tailwind.config.js` and writes it to `tailwind.config.php`. You can override the file names using the `--config`/`-c` and `--output`/`-o` options.

```
tw2php -c tailwind.js -o config/tailwind.php
tw2php --config tailwind.js --output config/tailwind.php
```

Now you can use the resolved config in your PHP as an object.

```php
<?php
$tailwind = require 'tailwind.config.php';
$tailwind->theme->colors->gray->{500};
```

Please remember that the PHP file does not automatically update.
