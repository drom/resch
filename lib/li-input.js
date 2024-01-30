'use strict';

const genErrors = require('./gen-errors');

module.exports = React => {
  const $ = React.createElement;
  return config => {

    let selfFocus = true;

    const genOnRef = props => input => {
      if (props.focus && input) {
        selfFocus = false;
        input.focus();
        selfFocus = true;
      }
    };

    const onFocus = function () {
      if (selfFocus) {
        config.updateState({focus: {$set: config.path.concat([true])}});
      }
    };

    const Errors = genErrors(config.validate)(React)(config.schema);

    const Rin = function (props) {
      const value = (props.data === undefined) ? 'undefined' :
        (props.data === null) ? 'null' : props.data.toString();
      return (
        $('li', {},
          $('span', {className: 'value'}, value),
          $('span', {className: 'title'}, config.schema.title),
          $(Errors, props)
        )
      );
    };

    const Lin = function (props) {
      return (
        $('li', {},
          $('span', {},
            props.children,
            $('input', {
              type: config.itype,
              defaultChecked: props.data,
              defaultValue: props.data,
              min: config.min,
              max: config.max,
              onChange: config.onChange,
              onFocus: onFocus,
              ref: genOnRef(props)
            }),
            $('span', {className: 'title'}, config.schema.title),
            $(Errors, props)
          )
        )
      );
    };

    return function dispatch (props) {
      return props.readonly ? Rin : Lin;
    };
  };
};
