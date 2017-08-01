'use strict';

const validateReSchemaErrors = require('./lib/gen-errors');

const reSchemaErrors = validateReSchemaErrors(
    schema => data => {
        if (!schema.enum.some(e => (e === data))) {
            return [`No enum match for: ${data}`];
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
                body.$set = event.target.value;
                updateData(spec);
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
