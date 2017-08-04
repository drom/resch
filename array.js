'use strict';

const validateReSchemaErrors = require('./lib/gen-errors')
    , validateArray = require('./lib/validate-array')
    ;

const reSchemaErrors = validateReSchemaErrors(validateArray);

function getDefaults (schema) {
    if (schema.allOf !== undefined) { return ''; }
    if (schema.anyOf !== undefined) { return ''; }
    if (schema.oneOf !== undefined) { return ''; }

    if (schema.enum !== undefined) { return schema.enum[0]; }

    if (schema.type === 'string') {
        // TODO check for default, minLength, pattern?
        return '';
    }
    if (schema.type === 'object') {
        const props = schema.properties;
        const keys = Object.keys(props);
        return keys.reduce((res, key) => Object.assign(res, {
            [key]: getDefaults(props[key])
        }), {});
    }
    if (schema.type === 'array') {
        // TODO check for minimum number of items?
        return [];
    }
    return null;
}

module.exports = React => {
    const $ = React.createElement;
    const schemaErrors = reSchemaErrors(React);
    return genForm => {

        function genItemizer (config) {
            const schema = config.schema
                , path = config.path
                , updateState = config.updateState;

            let arr = [];

            return {
                get: function (index) {
                    if (arr[index] === undefined) {
                        const selfPath = path.concat([index]);

                        let handleDelete;
                        if (typeof updateState === 'function') {
                            const selfBody = { $splice: [[index, 1]] };
                            const selfSpec = {
                                data: path.reduceRight((prev, key) => ({ [key]: prev }), selfBody)
                            };

                            handleDelete = function () {
                                updateState(selfSpec);
                            };
                        }

                        const Form = genForm({
                            schema: schema.items,
                            path: selfPath,
                            updateState: updateState
                        });

                        arr[index] = function Ari (props) {

                            return $('span', {},
                                $('button', {
                                    type: 'button',
                                    onClick: handleDelete
                                }, '-'),
                                $(Form, props)
                            );
                        };
                    }
                    return arr[index];
                }
            };
        }

        return config => {
            const itemizer = genItemizer(config);
            const schema = config.schema
                , path = config.path
                , updateState = config.updateState;
            const Errors = schemaErrors(schema);

            let handleAdd;
            if (typeof updateState === 'function') {
                const arrayBody = { $push: [getDefaults(schema.items)] };
                const arraySpec = {
                    data: path.reduceRight((prev, key) => ({ [key]: prev }), arrayBody)
                };
                handleAdd = function  () {
                    updateState(arraySpec);
                };
            }

            return class Arr extends React.Component {

                constructor (props) {
                    super(props);
                }

                shouldComponentUpdate (nextProps) {
                    if (this.props.data === nextProps.data) {
                        return false;
                    }
                    return true;
                }

                render () {
                    const data = this.props.data || [];
                    return (
                        $('li', {},
                            $('button', {
                                type: 'button',
                                onClick: handleAdd
                            }, '+'),
                            schema.title,
                            $('ol', { start: 0 },
                                data.map((e, i) => $(itemizer.get(i), {
                                    key: i,
                                    data: e
                                }))
                            ),
                            $(Errors, this.props)
                        )
                    );
                }
            };
        };
    };
};
