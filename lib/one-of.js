'use strict';

const cloneDeep = require('lodash.clonedeep')
    , mergeWith = require('lodash.mergewith')
    , getDefaults = require('./get-defaults')
    ;

function customizer (objValue, srcValue) {
    if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}

module.exports = validator => React => {
    const $ = React.createElement;

    return genForm => {

        return config => {

            const schema = config.schema
                , path = config.path
                , updateState = config.updateState
                ;

            const schemas = schema.oneOf.map(e => {
                const c1 = Object.keys(schema).reduce((res, gKey) => {
                    if (gKey !== 'oneOf') {
                        res[gKey] = cloneDeep(schema[gKey]);
                    }
                    return res;
                }, {});
                mergeWith(c1, e, customizer);
                return c1;
            });

            const children = schemas.map(schema => {
                return {
                    schema: schema,
                    validator: validator(schema),
                    fn: genForm({
                        schema: schema,
                        path: path,
                        updateState: config.updateState
                    })
                };
            });

            let onChange;
            if (typeof updateState === 'function') {
                const body = { $set: '' };
                const spec = {
                    data: path.reduceRight((p, k) => ({ [k]: p }), body)
                };
                onChange = function (event) {
                    const key = event.target.value;
                    const schema = schemas[key];
                    const defaults = getDefaults(schema);
                    body.$set = defaults;
                    updateState(spec);
                };
            }

            return class OneOf extends React.Component {

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
                    const props = this.props;

                    return children.some( e => e.validator(props.data))
                        ? children.map( (e, i) => e.validator(props.data) && 
                            $(e.fn, Object.assign({key : i}, props),
                                props.children,
                                $('select', { onChange: onChange, value: i },
                                    children.map((e, i) =>
                                        $('option', { key: i, value: i }, e.schema.title)
                                    )
                                )
                            )
                        )
                        : $('li', {},
                            props.children,
                            $('select', { onChange: onChange, value: -1 },
                                $('option', { disabled: true, value: -1 }, '---'),
                                children.map((e, i) =>
                                    $('option', { key: i, value: i }, e.schema.title)
                                )
                            )
                        );
                }
            };
        };
    };
};
