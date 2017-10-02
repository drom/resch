'use strict';

const genErrors = require('./gen-errors');


module.exports = React => {
    const $ = React.createElement;
    return config => {

        const title = config.schema.title || '';
        const length = (title.length * 9);
        const width = (Math.ceil(length / 32) * 32) + 'px';

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
                $('li', {},
                    $('span',
                        {
                            className: 'blk',
                            style: { width: width }
                        },
                        config.schema.title
                    ),
                    $('span', {},
                        props.data
                    ),
                    $(Errors, props)
                )
            );
        };

        const Lin = function (props) {
            return (
                $('li', {},
                    $('span', {},
                        props.children,
                        $('span',
                            {
                                className: 'blk',
                                style: { width: width }
                            },
                            config.schema.title
                        ),
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
