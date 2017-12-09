'use strict';

const genErrors = require('./gen-errors');


module.exports = React => {
    const $ = React.createElement;
    return config => {

        let selfFocus = true;

        const genOnRef = props => input => {
            if (props.focus && input) {
                selfFocus = false;
                input.focus();
                selfFocus = true;
            }
        };

        const onFocus = function () {
            if (selfFocus) {
                config.updateState({focus: {$set: config.path.concat([true])}});
            }
        };

        const Errors = genErrors(config.validate)(React)(config.schema);

        const Rin = function (props) {
            return (
                $('td', {},
                    $('span', {},
                        props.data
                    ),
                    $('div', {},
                        $(Errors, props)
                    )
                )
            );
        };

        const Lin = function (props) {
            return (
                $('td', {},
                    props.children,
                    $('input', {
                        type: config.itype,
                        checked: props.data,
                        value: props.data,
                        min: config.min,
                        max: config.max,
                        onChange: config.onChange,
                        onFocus: onFocus,
                        ref: genOnRef(props)
                    }),
                    $('div', {},
                        $(Errors, props)
                    )
                )
            );
        };

        return function dispatch (props) {
            return props.readonly ? Rin : Lin;
        };
    };
};
