'use strict';

const genErrors = require('./gen-errors');

module.exports = React => {
    const $ = React.createElement;
    return config => {

        const Errors = genErrors(config.validate)(React)(config.schema);
        return function Lin (props) {
            return (
                $('li', {}, config.schema.title,
                    $('input', {
                        type: config.itype,
                        checked: props.data,
                        value: props.data,
                        min: config.min,
                        max: config.max,
                        onChange: config.onChange
                    }),
                    $(Errors, props)
                )
            );
        };
    };
};
