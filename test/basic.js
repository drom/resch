'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const update = require('immutability-helper');
const chai = require('chai');

const resch = require('../lib/');
const rockSchema = require('../src/rock-schema');
const rockData = require('../src/rock-data');

const expect = chai.expect;

describe('basic', function () {
  const $ = React.createElement;

  const desc = Object.assign({}, resch);

  desc.oneOf = resch.__oneOf(schema => data => (
    data &&
        data.kind &&
        data.kind === schema.properties.kind.enum[0]
  ));

  const genForm = resch.__form(React)(desc);

  class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        data: props.data,
        focus: undefined,
        readonly: props.readonly
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
            readonly: this.state.readonly
          })
        )
      );
    }
  }

  it('t1', function (done) {
    const res = ReactDOMServer.renderToStaticMarkup($(App, { data: rockData }));
    expect(res).to.be.a('string');
    done();
  });

  it('t2', function (done) {
    const res = ReactDOMServer.renderToStaticMarkup($(App, { data: rockData, readonly: true}));
    expect(res).to.be.a('string');
    done();
  });

});

/* eslint-env mocha */
