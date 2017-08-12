'use strict';

function getDefaults (schema) {
    if (typeof schema !== 'object') { return; }
    if (schema.oneOf !== undefined) { return ''; }

    if (schema.default !== undefined) {
        return schema.default;
    }

    if ((schema.enum !== undefined) && (schema.enum.length === 1)) {
        return schema.enum[0];
    }

    if (schema.type === 'object') {
        const props = schema.properties || {};
        const keys = Object.keys(props);
        return keys.reduce((res, key) => Object.assign(res, {
            [key]: getDefaults(props[key])
        }), {});
    }
    if (schema.type === 'array') {
        // TODO check for minimum number of items?
        return [];
    }
    // return null;
}

module.exports = getDefaults;
