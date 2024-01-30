'use strict';

const validateReSchemaErrors = require('./gen-errors');
const validateObject = require('./validate-object');

const reSchemaErrors = validateReSchemaErrors(validateObject);

module.exports = React => {
  const $ = React.createElement;
  const schemaErrors = reSchemaErrors(React);
  return genForm => {

    function propReducer (config) {
      const schema = config.schema
        , path = Array.isArray(config.path) ? config.path : []
                ;

      const obj = schema.properties || {};
      const keys = Object.keys(obj);
      return keys.map(key => {
        var val = obj[key];
        return {
          name: key,
          fn: genForm({
            schema: val,
            path: path.concat([key]),
            updateState: config.updateState
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
          return (
            $('tr', {},
              $('td', {},
                this.props.children,
                $('span', {className: 'title'}, schema.title)
              ),
              children.map((e, i) => $(e.fn, {
                key: i,
                data: data[e.name],
                focus: (focus && focus.length !== 0 && focus[0] === e.name) ? focus.slice(1, focus.length) : undefined,
                readonly: this.props.readonly
              })),
              $(Errors, this.props)
            )
          );
        }
      };
    };
  };
};
