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

        let selfFocus = true;
        let elem = null;

        const genFocus = () => {
            if (selfFocus) {
                updateState({ focus: { $set: path.concat([true]) } });
            } else {
                elem.focus();
                selfFocus = true;
            }
        };

        return function Enm (props) {
            if (props.focus && props.focus.length === 1) {
                selfFocus = false;
                genFocus();
            }

            return (
                $('li', {}, schema.title,
                    $('select',
                        {
                            value: props.data,
                            onChange: onChange,
                            ref: (input) => { elem = input; },
                            onFocus: genFocus,
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
