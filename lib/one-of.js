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

            //console.log(schemas); /* eslint no-console: 1 */

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
                    if ((this.props.data === nextProps.data) && (nextProps.focus.length === 0)) {
                        return false;
                    }
                    return true;
                }

                render () {
                    const props = this.props;
                    return $('div', {},
                        children.map((e, i) => (
                            e.validator(props.data)
                                ? $(e.fn, Object.assign({ key: i }, props))
                                : null
                        )),
                        children.some(e => e.validator(props.data))
                            ? null
                            : $('select', { onChange: onChange, value: '---' },
                                $('option', { disabled: true, value: '---' }, '---'),
                                children.map((e, i) => $('option',
                                    { key: i, value: i },
                                    e.schema.title
                                ))
                            )
                    );
                }
            };
        };
    };
};
