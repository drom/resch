'use strict';

const validateReSchemaErrors = require('./lib/gen-errors')
    , validateObject = require('./lib/validate-object')
    ;

const reSchemaErrors = validateReSchemaErrors(validateObject);

module.exports = React => {
    const $ = React.createElement;
    const schemaErrors = reSchemaErrors(React);
    return genForm => {

        function propReducer (config) {
            const schema = config.schema
                , path = config.path
                , updateData = config.updateData;

            const obj = schema.properties;
            const keys = Object.keys(obj);
            return keys.map(key => {
                var val = obj[key];
                return {
                    name: key,
                    fn: genForm({
                        schema: val,
                        path: path.concat([key]),
                        updateData: updateData
                    })
                };
            });
        }

        return config => {
            const schema = config.schema;
            const Errors = schemaErrors(schema);
            const children = propReducer(config);

            return class Obj extends React.Component {

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
                    return (
                        $('li', {}, schema.title,
                            $('ul', {},
                                children.map((e, i) => $(e.fn, {
                                    key: i,
                                    data: data[e.name]
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
