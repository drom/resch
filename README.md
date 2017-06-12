Creation of UI form from JSON schema description.

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