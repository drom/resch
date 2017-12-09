'use strict';

const reGenTdInput = require('./td-input');
const validateNumeric = require('./validate-numeric');

module.exports = React => {
    const $ = React.createElement;
    const genTdInput = reGenTdInput(React);
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

        const TdInput = genTdInput({
            schema: schema,
            path: path,
            itype: 'number',
            min: schema.minimum,
            max: schema.maximum,
            onChange: onChange,
            updateState: updateState,
            validate: validateNumeric
        });

        return function Str (props) {
            return $(TdInput(props), props);
        };
    };
};
