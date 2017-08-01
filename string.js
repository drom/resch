'use strict';

module.exports = React => () => config => {

    const $ = React.createElement;

    const schema = config.schema
        , path = config.path
        , updateData = config.updateData;

    const errors = data => {
        let errors = [];

        if (typeof data !== 'string') {
            errors.push('type');
        } else {
            if (
                (typeof schema.minLength === 'number') &&
                (data.length < schema.minLength)
            ) {
                errors.push('too short');
            }

            if (
                (typeof schema.maxLength === 'number') &&
                (data.length > schema.maxLength)
            ) {
                errors.push('too long');
            }
            if (
                (typeof schema.pattern === 'string') &&
                (data.match(schema.pattern) === null)
            ) {
                errors.push('pattern missmatch');
            }
        }

        // TODO: check more

        if (errors.length === 0) { return null; }

        return $('span', {
            style: {color: 'red'}
        }, 'E: ', errors.join(', '));
    };

    let onChange;
    if (typeof updateData === 'function') {
        const body = { $set: '' };
        const spec = path.reduceRight((p, k) => ({ [k]: p }), body);
        onChange = function (event) {
            body.$set = event.target.value;
            updateData(spec);
        };
    }

    return function S (props) {
        return (
            $('li', {}, schema.title,
                $('input', {
                    value: props.data,
                    onChange: onChange
                }),
                errors(props.data)
            )
        );
    };

};
