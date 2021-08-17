# a11y-audit
Performs a quick accessibility audit for a given url by spinning up the local server if required built on top of `@axe-core/cli`.

## Install
```
npm i -g perform-a11y-audit
```

## Pre-requisites
This tool requires `@axe-core/cli` and `pm2` to be installed globally, if not already installed these will be installed globally by this tool.

## Usage
```
a11y-audit <options>
```

```
a11y-audit -u https://github.com/ -s false -t wcag2a,wcag2aa -b chrome --save results.json -o rules color-contrast,html-has-lang
```

This will perform accessibility test on github.com to check wcag2a and wcag2aa standards on chrome and saves results to results.json in current working directory.