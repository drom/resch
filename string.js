'use strict';

const reGenLiInput = require('./lib/li-input')
    , validateString = require('./lib/validate-string')
    ;

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
                body.$set = event.target.value;
                updateData(spec);
            };
        }

        const LiInput = genLiInput({
            schema: schema,
            itype: 'text',
            onChange: onChange,
            validate: validateString
        });

        return function Str (props) {
            return $(LiInput, props);
        };
    };
};
