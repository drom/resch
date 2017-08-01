'use strict';

module.exports = validator => React => {
    const $ = React.createElement;
    return schema => {
        const v = validator(schema);
        return function Err (props) {
            const res = v(props.data);
            if (res.length === 0) { return null; }
            return $('span', {
                style: {color: 'red'}
            }, 'E: ', res.join(', '));
        };
    };
};
