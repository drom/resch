'use strict';

const reGenLiInput = require('./li-input')
    , validateNumeric = require('./validate-numeric')
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
                body.$set = parseInt(event.target.value, 10);
                updateState(spec);
            };
        }

        const updateFocus = () => {
            updateState({focus: {$set: path.concat([true])}});
        };

        const LiInput = genLiInput({
            schema: schema,
            itype: 'number',
            min: schema.minimum,
            max: schema.maximum,
            onChange: onChange,
            updateFocus: updateFocus,
            validate: validateNumeric
        });

        return function Int (props) {
            return $(LiInput, props);
        };
    };
};
