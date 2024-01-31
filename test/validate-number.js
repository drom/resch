'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const chai = require('chai');

const resch = require('../lib/');

const expect = chai.expect;

describe('number errors', () => {
  const $ = React.createElement;
  const desc = Object.assign({}, resch);
  const genForm = resch.__form(React)(desc);

  it('no limits', done => {
    const Form = genForm({ schema: {
      type: 'number'
    }});
    const res = ReactDOMServer.renderToStaticMarkup($(Form, {
      data: 42
    }));
    expect(res).to.be.a('string');
    done();
  });

  [4, 5, 20, 21]
    .forEach(data => {

      it(`multipleOf: ${data}`, done => {
        const Form = genForm({ schema: {
          type: 'number',
          multipleOf: 5
        }});
        const res = ReactDOMServer.renderToStaticMarkup($(Form, {
          data: data
        }));
        expect(res).to.be.a('string');
        done();
      });

    });

  [5, 10, 15, 20, 25]
    .forEach(data => {

      it(data.toString(), done => {
        const Form = genForm({ schema: {
          type: 'number',
          minimum: 10,
          maximum: 20,
          exclusiveMinimum: true,
          exclusiveMaximum: true
        }});
        const res = ReactDOMServer.renderToStaticMarkup($(Form, {
          data: data
        }));
        expect(res).to.be.a('string');
        done();
      });

    });

});

/* eslint-env mocha */
