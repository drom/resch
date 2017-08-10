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

        const LiInput = genLiInput({
            schema: schema,
            path: path,
            itype: 'checkbox',
            onChange: onChange,
            updateState: updateState,
            validate: validateBoolean
        });

        return function Bul (props) {
            return $(LiInput, props);
        };
    };
};
