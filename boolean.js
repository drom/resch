'use strict';

module.exports = React => () => config => {

    const $ = React.createElement;
    const errors = data => {
        var errors = [];

        if (typeof data !== 'boolean') {
            errors.push('expected boolean');
        }

        // TODO: check more

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
            body.$set = event.target.checked;
            updateData(spec);
        };
    }

    return function B (props) {
        return (
            $('li', {}, schema.title,
                $('input', {
                    type: 'checkbox',
                    checked: props.data,
                    onChange: onChange
                }),
                errors(props.data)
            )
        );
    };

};
