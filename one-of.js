'use strict';

const defaultsDeep = require('lodash.defaultsdeep')
    ;

module.exports = validator => React => {
    const $ = React.createElement;

    return genForm => {

        return config => {

            const schema = config.schema
                , path = config.path
                , updateData = config.updateData
                ;

            const schemas = schema.oneOf.map(e => {
                Object.keys(schema).forEach(gKey => {
                    if (gKey !== 'oneOf') {
                        defaultsDeep(e, { [gKey]: schema[gKey] });
                    }
                });
                return e;
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
                        e.validator(props)
                            ? $(e.fn, { key: i, data: props })
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
                    const data = this.props.data;
                    return $(OneOfSw, data);
                }
            };
        };
    };
};
