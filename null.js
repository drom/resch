'use strict';

const validateReSchemaErrors = require('./lib/gen-errors');

const reSchemaErrors = validateReSchemaErrors(
    () => data => {
        if (data !== null) {
            return [`Invalid type: ${typeof data} (expected null)`];
        }
        return [];
    }
);

module.exports = React => {
    const $ = React.createElement;
    const schemaErrors = reSchemaErrors(React);
    return () => config => {
        const schema = config.schema;
        const Errors = schemaErrors(schema);
        return function Nul (props) {
            return (
                $('li', {}, schema.title,
                    $(Errors, props)
                )
            );
        };
    };
};
