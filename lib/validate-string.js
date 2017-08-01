'use strict';

module.exports = schema => data => {
    let errors = [];

    const type = typeof data;

    if (type !== 'string') {
        errors.push(`Invalid type: ${type} (expected string)`);
    } else {
        if (
            (typeof schema.minLength === 'number') &&
            (data.length < schema.minLength)
        ) {
            errors.push(`String is too short (${data.length} chars), minimum ${schema.minLength}`);
        }

        if (
            (typeof schema.maxLength === 'number') &&
            (data.length > schema.maxLength)
        ) {
            errors.push(`String is too long (${data.length} chars), maximum ${schema.maxLength}`);
        }
        if (
            (typeof schema.pattern === 'string') &&
            (data.match(schema.pattern) === null)
        ) {
            errors.push(`String does not match pattern: ${schema.pattern}`);
        }
    }
    return errors;
};
