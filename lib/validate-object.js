'use strict';

const tv4 = require('tv4');

module.exports = schema => data => {
    return (typeof data !== 'object')
        ? [`Invalid type: ${typeof data} (expected object)`]
        : [].concat(
            (schema.anyOf !== undefined || (schema.allOf !== undefined))
                ? tv4.validateMultiple(data, schema).errors
                : []
        );
};
