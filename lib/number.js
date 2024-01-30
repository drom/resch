'use strict';

const reGenLiInput = require('./li-input');
const validateNumeric = require('./validate-numeric');

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
        const val = event.target.value;
        body.$set = isNaN(val) ? val : Number(val);
        updateState(spec);
      };
    }

    const LiInput = genLiInput({
      schema: schema,
      path: path,
      itype: 'number',
      min: schema.minimum,
      max: schema.maximum,
      onChange: onChange,
      updateState: updateState,
      validate: validateNumeric
    });

    return function Num (props) {
      return $(LiInput(props), props);
    };
  };
};
