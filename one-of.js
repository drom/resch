'use strict';

const cloneDeep = require('lodash.clonedeep')
    , mergeWith = require('lodash.mergewith')
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
                , updateData = config.updateData
                ;

            const schemas = schema.oneOf.map(e => {

                // console.log(schema); /* eslint no-console: 1 */

                const c1 = Object.keys(schema).reduce((res, gKey) => {
                    if (gKey !== 'oneOf') {
                        res[gKey] = cloneDeep(schema[gKey]);
                    }
                    return res;
                }, {});

                mergeWith(c1, e, customizer);

                console.log(c1); /* eslint no-console: 1 */

                // console.log(c1); /* eslint no-console: 1 */

                return c1;
            });

            //console.log(schemas); /* eslint no-console: 1 */

            const children = schemas.map(schema => {
                return {
                    validator: validator(schema),
                    fn: genForm({
                        schema: schema,
                        path: path,
                        updateData: updateData
                    })
                };
            });

            function OneOfSw (props) {
                return $('div', {},
                    children.map((e, i) => (
                        e.validator(props.data)
                            ? $(e.fn, Object.assign({ key: i }, props))
                            : null
                    ))
                );
            }

            return class OneOf extends React.Component {

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
                    return $(OneOfSw, this.props);
                }
            };
        };
    };
};
