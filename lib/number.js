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
            , updateState = config.updateState;

        let onChange;
        if (typeof updateState === 'function') {
            const body = { $set: '' };
            const spec = {
                data: path.reduceRight((p, k) => ({ [k]: p }), body)
            };
            onChange = function (event) {
                body.$set = Number(event.target.value);
                updateState(spec);
            };
        }

        const LiInput = genLiInput({
            schema: schema,
            itype: 'number',
            min: schema.minimum,
            max: schema.maximum,
            onChange: onChange,
            validate: validateNumeric
        });

        return function Num (props) {
            return $(LiInput, props);
        };
    };
};
