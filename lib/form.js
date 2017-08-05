'use strict';

const bb = (des, a1, a2) => (
    Object.keys(des).reduce((res, key) => {
        res[key] = des[key](a1)(a2);
        return res;
    }, {})
);

module.exports = React => des => {

    const comps = bb(des, React, genForm);

    function genForm (config) {
        const schema = config.schema
            , path = config.path;

        const type = schema.type
            , widget = schema.widget;

        let key;
        if (!['allOf', 'anyOf', 'oneOf', 'enum'].some(k => {
            const m = (schema[k] !== undefined);
            if (m) {
                key = k;
            }
            return m;
        })) {
            if (typeof type  === 'string' ) {
                key = type;
            } else {
                throw new Error(
                    `Unxpected type: ${typeof type} of node:  ${JSON.stringify(path)}`
                );
            }
        }

        const fullKey = key + (
            ((widget === undefined) ? '' : ('_' + widget))
        );

        const fn = comps[fullKey];

        if (typeof fn !== 'function') {
            throw new Error(
                `Unexpected component: ${fullKey} for node: ${JSON.stringify(path)}`
            );
        }

        return fn(config);
    }

    return genForm;
};
