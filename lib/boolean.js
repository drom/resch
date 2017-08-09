'use strict';

const reGenLiInput = require('./li-input')
    , validateBoolean = require('./validate-boolean')
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
                body.$set = event.target.checked;
                updateState(spec);
            };
        }

        const updateFocus = () => {
            updateState({focus: {$set: path.concat([true])}});
        };

        const LiInput = genLiInput({
            schema: schema,
            itype: 'checkbox',
            onChange: onChange,
            updateFocus: updateFocus,
            validate: validateBoolean
        });

        return function Bul (props) {
            return $(LiInput, props);
        };
    };
};
