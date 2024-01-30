'use strict';

const validateReSchemaErrors = require('./gen-errors');
const validateNull = require('./validate-null');

const reSchemaErrors = validateReSchemaErrors(validateNull);

module.exports = React => {
  const $ = React.createElement;
  const schemaErrors = reSchemaErrors(React);
  return () => config => {
    const schema = config.schema;
    const Errors = schemaErrors(schema);
    return function Nul (props) {
      return (
        $('li', {},
          $('span', {className: 'title'}, schema.title),
          $(Errors, props)
        )
      );
    };
  };
};
