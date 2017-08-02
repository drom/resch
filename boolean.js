'use strict';

const reGenLiInput = require('./lib/li-input');

const validate = () => data => {
    if (typeof data !== 'boolean') {
        return [`Invalid type: ${typeof data} (expected boolean)`];
    }
    return [];
};

module.exports = React => {
    const $ = React.createElement;
    const genLiInput = reGenLiInput(React);
    return () => config => {
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
        const LiInput = genLiInput({
            schema: schema,
            itype: 'checkbox',
            onChange: onChange,
            validate: validate
        });

        return function Bul (props) {
            return $(LiInput, props);
        };
    };
};
