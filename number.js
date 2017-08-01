'use strict';

const validateNumeric = require('./lib/validate-numeric')
    , validateReSchemaErrors = require('./lib/gen-errors')
    ;

const reSchemaErrors = validateReSchemaErrors(validateNumeric);

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
                body.$set = Number(event.target.value);
                updateData(spec);
            };
        }

        return function Num (props) {
            return (
                $('li', {}, schema.title,
                    $('input', {
                        type: 'number',
                        value: props.data,
                        onChange: onChange
                    }),
                    $(Errors, props)
                )
            );
        };
    };
};
