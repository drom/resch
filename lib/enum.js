'use strict';

const validateReSchemaErrors = require('./gen-errors')
    , validateEnum = require('./validate-enum')
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

        const genOnRef = props => input => {
            if (props.focus && input) {
                selfFocus = false;
                input.focus();
                selfFocus = true;
            }
        };

        let selfFocus = true;
        const onFocus = function () {
            if (selfFocus) {
                config.updateState({focus: {$set: config.path.concat([true])}});
            }
        };

        return function Enm (props) {
            return (
                $('li', {}, schema.title,
                    $('select',
                        {
                            value: props.data,
                            onChange: onChange,
                            onFocus: onFocus,
                            ref: genOnRef(props)
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
