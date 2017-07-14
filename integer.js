'use strict';

module.exports = React => () => config => {

    const $ = React.createElement;
    const errors = data => {
        var errors = [];

        if (
            (typeof data !== 'number') ||
            (data !== parseInt(data, 10))
        ) {
            errors.push('expected integer');
        }

        // TODO: check more

        if (errors.length === 0) { return null; }

        return $('span', {
            style: {color: 'red'}
        }, 'E: ', errors.join(', '));
    };

    const { schema, path, updateData } = config;
    const body = { $set: '' };
    const spec = path.reduceRight((p, k) => ({ [k]: p }), body);

    function onChange (event) {
        body.$set = parseInt(event.target.value, 10);
        updateData(spec);
    }

    return function I (props) {
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
