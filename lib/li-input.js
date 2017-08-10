'use strict';

const genErrors = require('./gen-errors');

module.exports = React => {
    const $ = React.createElement;
    return config => {

        const Errors = genErrors(config.validate)(React)(config.schema);
        return function Lin (props) {
            const title = config.schema.title || '';
            const length = (title.length * 9);
            const width = (Math.ceil(length / 32) * 32) + 'px';
            return (
                $('li', {},
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
                        onChange: config.onChange
                    }),
                    $(Errors, props)
                )
            );
        };
    };
};
