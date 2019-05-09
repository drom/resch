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
                , path = Array.isArray(config.path) ? config.path : []
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
                                data: path.reduceRight((prev, key) => ({ [key]: prev }), selfBody),
                                focus: { $set: undefined }
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

                            return $(Form, props,
                                $('button',
                                    {
                                        type: 'button',
                                        onClick: handleDelete
                                    },
                                    '-'
                                )
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
                const focusSpec = { $set: path };
                const itemSpec = [getDefaults(schema.items)];
                const arrayBody = { $push: itemSpec };
                const arraySpec = {
                    data: path.reduceRight((prev, key) => ({ [key]: prev }), arrayBody),
                    focus: focusSpec
                };
                const newBody = { $set: itemSpec };
                const newArraySpec = {
                    data: path.reduceRight((prev, key) => ({ [key]: prev }), newBody),
                    focus: focusSpec
                };
                handleAdd = len => function () {
                    focusSpec.$set = path.concat([len]);
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
                    return !(
                        nextProps.data === this.props.data &&
                        nextProps.focus === undefined &&
                        nextProps.readonly === this.props.readonly
                    );
                }

                render () {
                    const data = Array.isArray(this.props.data) ? this.props.data : []
                        , focus = this.props.focus
                        ;
                    const iProps = schema.items.properties;
                    const iKeys = Object.keys(iProps);
                    const iTitles = iKeys.map(key => iProps[key].title);
                    return (
                        $('div', {},
                            $('span', {className: 'title'}, schema.title),
                            $('table', {},
                                this.props.children,
                                $('thead', {},
                                    $('tr', {},
                                        $('th', {},
                                            $('button', {
                                                type: 'button',
                                                onClick: handleAdd(data.length)
                                            }, '+')
                                        ),
                                        iTitles.map((e, i) => (
                                            $('th', {key: i}, e)
                                        ))
                                    )
                                ),
                                $('tbody', {},
                                    data.map((e, i) => $(itemizer.get(i), {
                                        key: i,
                                        data: e,
                                        focus: (focus && focus.length !== 0 && focus[0] === i) ? focus.slice(1, focus.length) : undefined,
                                        readonly: this.props.readonly
                                    }))
                                ),
                                $(Errors, this.props)
                            )
                        )
                    );
                }
            };
        };
    };
};
