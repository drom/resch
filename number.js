'use strict';

module.exports = React => () => config => {

    const $ = React.createElement;
    const errors = data => {
        var errors = [];

        const type = typeof data;
        if (type !== 'number') {
            errors.push(`Invalid type: ${type} (expected number)`);
        } else {
            if (typeof schema.minimum === 'number') {
                if (data < schema.minimum) {
                    errors.push(`Value ${data} is less than minimum ${schema.minimum}`);
                }
                if (schema.exclusiveMinimum === true) {
                    if (data === schema.minimum) {
                        errors.push(`Value ${data} is equal to exclusive minimum ${schema.minimum}`);
                    }
                }
            }
            if (typeof schema.maximum === 'number') {
                if (data > schema.maximum) {
                    errors.push(`Value ${data} is greater than maximum ${schema.maximum}`);
                }
                if (schema.exclusiveMaximum === true) {
                    if (data === schema.maximum) {
                        errors.push(`Value ${data} is equal to exclusive maximum ${schema.maximum}`);
                    }
                }
            }
            const multipleOf = schema.multipleOf;
            if (typeof multipleOf === 'number') {
                if ((data % multipleOf) !== 0) {
                    errors.push(`Value ${data} is not a multiple of ${multipleOf}`);
                }
            }
        }

        if (errors.length === 0) { return null; }

        return $('span', {
            style: {color: 'red'}
        }, 'E: ', errors.join(', '));
    };

    const schema = config.schema
        , path = config.path
        , updateData = config.updateData;

    let onChange;
    if (typeof updateData === 'function') {
        const body = { $set: '' };
        const spec = path.reduceRight((p, k) => ({ [k]: p }), body);
        onChange = function (event) {
            body.$set = Number(event.target.value);
            updateData(spec);
        };
    }

    return function N (props) {
        return (
            $('li', {}, schema.title,
                $('input', {
                    type: 'number',
                    value: props.data,
                    onChange: onChange
                }),
                errors(props.data)
            )
        );
    };

};
