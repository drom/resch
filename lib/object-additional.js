'use strict';

const validateReSchemaErrors     = require('./gen-errors');
const validateObject             = require('./validate-object');
const getDefaults                = require('./get-defaults');

const reSchemaErrors = validateReSchemaErrors(validateObject);

const mergeArray = (arr1, arr2) => {
    return arr1.concat(arr2.filter(function (item) {
        return arr1.indexOf(item) === -1;
    }));
};

module.exports = React => {
    const $ = React.createElement;
    const schemaErrors = reSchemaErrors(React);
    return genForm => {

        function genItemizer (config) {
            const schema = config.schema
                , path = Array.isArray(config.path) ? config.path : []
                , updateState = config.updateState;

            let objKeys = Object.keys(schema.properties || {});
            let arr = {};

            return {
                get: function (index) {
                    const owns = objKeys.indexOf(index) !== -1;
                    if (arr[index] === undefined) {

                        const selfPath = path.concat([index]);

                        let handleDelete;
                        let handleChange;
                        if (typeof updateState === 'function') {
                            const selfBody = { $unset: [index] };
                            const selfSpec = {
                                data: path.reduceRight((prev, key) => ({ [key]: prev }), selfBody),
                                focus: { $set: undefined }
                            };

                            handleDelete = function () {
                                updateState(selfSpec);
                            };

                            handleChange = function(e) {
                                const newKey = e.target.value;
                                const changeBody = (obj) => {
                                    const ret = {};
                                    Object.keys(obj).forEach(e => {
                                        if (e === index) {
                                            ret[newKey] = obj[e];
                                        } else {
                                            ret[e] = obj[e];
                                        }
                                    });
                                    return ret;
                                };
                                const changeSpec = {
                                    data: path.reduceRight((prev, key) => ({ [key]: prev }), changeBody),
                                    focus: { $set: config.path.concat([newKey]) }
                                };
                                updateState(changeSpec);
                                delete arr[index];
                            };
                        }

                        const Form = genForm({
                            schema: owns ? schema.properties[index] : schema.additionalProperties,
                            path: selfPath,
                            updateState: updateState
                        });

                        arr[index] = function Ori(props) {
                            let selfFocus = true;

                            const genOnRef = props => input => {
                                if (props.focus && props.focus.length === 0 && input) {
                                    selfFocus = false;
                                    input.focus();
                                    selfFocus = true;
                                }
                            };

                            const onFocus = function (e) {
                                if (selfFocus) {
                                    config.updateState({focus: {$set: config.path.concat([index, true])}});
                                }
                                let temp = e.target.value;
                                e.target.value = '';
                                e.target.value = temp;
                            };

                            const newProps = Object.assign({}, props);
                            newProps.focus = newProps.focus !== undefined && newProps.focus[0] === index
                                ? newProps.focus.slice(1, newProps.focus.length)
                                : undefined;

                            return $(Form, props,
                                !owns && $('button',
                                    {
                                        type: 'button',
                                        onClick: handleDelete
                                    },
                                    '-'
                                ),
                                !owns && $('input', {
                                    type: 'text',
                                    value: props.title,
                                    onChange: handleChange,
                                    ref: genOnRef(props),
                                    onFocus: onFocus
                                })
                            );
                        };
                    }
                    return arr[index];
                }
            };
        }

        return config => {
            const schema = config.schema;
            const updateState = config.updateState;
            const path = config.path;
            const Errors = schemaErrors(schema);
            const itemizer = genItemizer(config);

            let handleAdd;
            if (typeof updateState === 'function') {
                const focusSpec = { $set: path };
                const itemSpec = getDefaults(schema.additionalProperties);
                const arrayBody = { $auto: { '': { $set: itemSpec } } };
                const arraySpec = {
                    data: path.reduceRight((prev, key) => ({ [key]: prev }), arrayBody),
                    focus: focusSpec
                };
                handleAdd = function () {
                    focusSpec.$set = path.concat(['']);
                    updateState(arraySpec);
                };
            }

            return class Obj extends React.Component {

                constructor (props) {
                    super(props);
                }

                shouldComponentUpdate (nextProps) {
                    return !(
                        nextProps.data === this.props.data &&
                        nextProps.focus === undefined &&
                        nextProps.readonly === this.props.readonly
                    );
                }

                render () {
                    const data = this.props.data || {}
                        , focus = this.props.focus
                        ;

                    const keys = mergeArray(
                        Object.keys(schema.properties || {}),
                        Object.keys(typeof data === 'object' ? data : {})
                    );

                    return (
                        $('li', {},
                            this.props.children,
                            typeof schema.additionalProperties === 'object' &&
                                $('button', {
                                    type: 'button',
                                    onClick: handleAdd
                                }, '+'),
                            schema.title,
                            $('ul', {},
                                keys.map((e, i) =>
                                    $(itemizer.get(e), {
                                        key: i,
                                        focus: focus !== undefined && focus[0] === e
                                            ? focus.slice(1, focus.length)
                                            : undefined,
                                        data: data[e],
                                        title: e
                                    })
                                )
                            ),
                            $(Errors, this.props)
                        )
                    );
                }
            };
        };
    };
};
