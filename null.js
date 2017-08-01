'use strict';

module.exports = React => () => config => {

    const $ = React.createElement;

    const errors = data => {
        var errors = [];

        if (data !== null) {
            errors.push('type');
        }

        // TODO: check more

        if (errors.length === 0) { return null; }

        return $('span', {
            style: {color: 'red'}
        }, 'E: ', errors.join(', '));
    };

    const schema = config.schema;

    return function NULL (props) {
        return (
            $('li', {}, schema.title,
                errors(props.data)
            )
        );
    };

};
