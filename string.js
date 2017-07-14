'use strict';

module.exports = React => () => config => {

    const $ = React.createElement;
    const errors = data => {
        var errors = [];

        if (typeof data !== 'string') {
            errors.push('type');
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
        body.$set = event.target.value;
        updateData(spec);
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
