'use strict';

const validateReSchemaErrors = require('./gen-errors')
    , validateArray = require('./validate-array')
    , getDefaults = require('./get-defaults')
    ;

const reSchemaErrors = validateReSchemaErrors(validateArray);

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

            let handleAdd = () => {};
            if (typeof updateState === 'function') {
                const itemSpec = [getDefaults(schema.items)];
                const arrayBody = { $push: itemSpec };
                const arraySpec = {
                    data: path.reduceRight((prev, key) => ({ [key]: prev }), arrayBody)
                };
                const newBody = { $set: itemSpec };
                const newArraySpec = {
                    data: path.reduceRight((prev, key) => ({ [key]: prev }), newBody)
                };
                handleAdd = len => function () {
                    if (len === 0) {
                        updateState(newArraySpec);
                    } else {
                        updateState(arraySpec);
                    }
                };
            }

            return class Arr extends React.Component {

                constructor (props) {
                    super(props);
                }

                shouldComponentUpdate (nextProps) {
                    if (this.props.data === nextProps.data && nextProps.focus === undefined) {
                        return false;
                    }
                    return true;
                }

                render () {
                    const data = Array.isArray(this.props.data) ? this.props.data : []
                        , focus = this.props.focus
                        ;
                    return (
                        $('li', {},
                            $('button', {
                                type: 'button',
                                onClick: handleAdd(data.length)
                            }, '+'),
                            schema.title,
                            $('ol', { start: 0 },
                                data.map((e, i) => $(itemizer.get(i), {
                                    key: i,
                                    data: e,
                                    focus: (focus && focus.length !== 0 && focus[0] === i) ? focus.slice(1, focus.length) : undefined
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
