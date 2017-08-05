'use strict';

const validateReSchemaErrors = require('./lib/gen-errors')
    , validateEnum = require('./lib/validate-enum')
    ;

const reSchemaErrors = validateReSchemaErrors(validateEnum);

module.exports = React => {
    const $ = React.createElement;
    const schemaErrors = reSchemaErrors(React);
    return () => config => {
        const schema = config.schema
            , path = config.path
            , updateState = config.updateState;
        const Errors = schemaErrors(schema);

        let onChange;
        if (typeof updateState === 'function') {
            const body = { $set: '' };
            const spec = {
                data: path.reduceRight((p, k) => ({ [k]: p }), body)
            };
            onChange = function (event) {
                body.$set = event.target.value;
                updateState(spec);
            };
        }

        return function Enm (props) {
            return (
                $('li', {}, schema.title,
                    $('select',
                        {
                            value: props.data,
                            onChange: onChange
                        },
                        schema.enum.map((e, i) => (
                            $('option', {
                                key: i,
                                value: e
                            }, e)
                        ))
                    ),
                    $(Errors, props)
                )
            );
        };
    };
};
