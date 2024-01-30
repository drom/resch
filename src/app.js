'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const update = require('immutability-helper');
const resch = require('../lib/');
const rockSchema = require('./rock-schema');
const rockData = require('./rock-data');

const $ = React.createElement;

const desc = Object.assign({}, resch);

desc.oneOf = resch.__oneOf(schema => data =>
  (schema.properties.kind.enum[0] === data.kind)
);

const genForm = resch.__form(React)(desc);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      focus: undefined
    };
    this.updateState = this.updateState.bind(this);

    this.Form = genForm({
      schema: rockSchema,
      path: [],
      updateState: this.updateState
    });
  }

  updateState (spec) {
    this.setState(function (state) {
      return update(state, spec);
    });
  }

  render () {
    return (
      $('div', {},
        $(this.Form, {
          data: this.state.data,
          focus: this.state.focus,
          readonly: this.state.data.readonly
        })
      )
    );
  }
}

ReactDOM.render(
  $(App, { data: rockData }),
  document.getElementById('root')
);

/* eslint-env browser */
