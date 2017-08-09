'use strict';

const genErrors = require('./gen-errors');

module.exports = React => {
    const $ = React.createElement;
    return config => {

        let selfFocus = true;
        let elem = null;

        const genFocus = () => {
            if (selfFocus) {
                config.updateFocus();
            } else {
                elem.focus();
                selfFocus = true;
            }
        };

        const Errors = genErrors(config.validate)(React)(config.schema);
        return function Lin (props) {
            if (props.focus && props.focus.length === 1) {
                selfFocus = false;
                genFocus();
            }
            return (
                $('li', {}, config.schema.title,
                    $('input', {
                        type: config.itype,
                        checked: props.data,
                        value: props.data,
                        min: config.min,
                        max: config.max,
                        onChange: config.onChange,
                        ref: (input) => { elem = input; },
                        onFocus: genFocus,
                    }),
                    $(Errors, props)
                )
            );
        };
    };
};
