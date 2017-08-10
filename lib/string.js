'use strict';

const reGenLiInput = require('./li-input')
    , validateString = require('./validate-string')
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
            const spec = { data: path.reduceRight((p, k) => ({ [k]: p }), body) };
            onChange = function (event) {
                body.$set = event.target.value;
                updateState(spec);
            };
        }

        const LiInput = genLiInput({
            schema: schema,
            path: path,
            itype: 'text',
            onChange: onChange,
            updateState: updateState,
            validate: validateString
        });

        return function Str (props) {
            return $(LiInput, props);
        };
    };
};
