'use strict';

const reGenLiInput = require('./lib/li-input')
    , validateNumeric = require('./lib/validate-numeric')
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
                body.$set = Number(event.target.value);
                updateData(spec);
            };
        }

        const LiInput = genLiInput({
            schema: schema,
            itype: 'number',
            onChange: onChange,
            validate: validateNumeric
        });

        return function Num (props) {
            return $(LiInput, props);
        };
    };
};
