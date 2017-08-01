'use strict';

const validateReSchemaErrors = require('./lib/gen-errors');

const reSchemaErrors = validateReSchemaErrors(
    () => data => {
        if (typeof data !== 'boolean') {
            return [`Invalid type: ${typeof data} (expected boolean)`];
        }
        return [];
    }
);

module.exports = React => {
    const $ = React.createElement;
    const schemaErrors = reSchemaErrors(React);
    return () => config => {
        const schema = config.schema
            , path = config.path
            , updateData = config.updateData;
        const Errors = schemaErrors(schema);

        let onChange;
        if (typeof updateData === 'function') {
            const body = { $set: '' };
            const spec = path.reduceRight((p, k) => ({ [k]: p }), body);
            onChange = function (event) {
                body.$set = event.target.checked;
                updateData(spec);
            };
        }

        return function Bul (props) {
            return (
                $('li', {}, schema.title,
                    $('input', {
                        type: 'checkbox',
                        checked: props.data,
                        onChange: onChange
                    }),
                    $(Errors, props)
                )
            );
        };
    };
};
