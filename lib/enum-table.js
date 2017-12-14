'use strict';

const validateReSchemaErrors    = require('./gen-errors');
const validateEnum              = require('./validate-enum');

function toString (val) {
    if (val === undefined) {
        return '--';
    }
    return val.toString();
}

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
                body.$set = schema.enum[event.target.value];
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
                $('td', {},
                    props.children,
                    $('select',
                        {
                            value: schema.enum.indexOf(props.data),
                            onChange: onChange,
                            onFocus: onFocus,
                            ref: genOnRef(props)
                        },
                        schema.enum.map((e, i) => (
                            $('option', {
                                key: i,
                                value: i
                            }, toString(e))
                        ))
                    ),
                    $('div', {}, $(Errors, props))
                )
            );
        };
    };
};
