[![NPM version](https://img.shields.io/npm/v/resch.svg)](https://www.npmjs.org/package/resch)
[![Travis](https://travis-ci.org/drom/resch.svg?branch=master)](https://travis-ci.org/drom/resch)
[![appVeyor](https://ci.appveyor.com/api/projects/status/otcvhgxbchj04qfw?svg=true)](https://ci.appveyor.com/project/drom/resch)
[![Coverage Status](https://coveralls.io/repos/github/drom/resch/badge.svg?branch=master)](https://coveralls.io/github/drom/resch?branch=master)
[![dependencies Status](https://david-dm.org/drom/resch/status.svg)](https://david-dm.org/drom/resch)

The tool to create React components from JSON schema to edit matching immutable data.

## Semantics

JSON schema specification created mostly with JSON data validation in mind.
Some of JSON schema semantics can be used to describe the UI view of data.

## type specific view semantics

### string, number, integer

 * `enum` : `Array<>` - creates dropdown selector

### object

 * `properties` : `Object`
 * `required` : `Array<string>` - fixes the property existance

### array

 * `items` : `Object`
 * `minItems` : `number`
 * `maxItems` : `number`

### OneOf

```js
{
  "oneOf": [
    { "type": "number" },
    { "type": "string" }
  ]
}
```
