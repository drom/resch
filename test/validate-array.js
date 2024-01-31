'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const chai = require('chai');

const resch = require('../lib/');

const expect = chai.expect;

describe('array errors', () => {
  const $ = React.createElement;
  const desc = Object.assign({}, resch);
  const genForm = resch.__form(React)(desc);

  [[], [1, 2, 3], [1, 2, 3, 4, 5, 6]]
    .forEach(data => {
      it(JSON.stringify(data), done => {
        const Form = genForm({ schema: {
          type: 'array',
          minItems: 2,
          maxItems: 4,
          items: {
            type: 'number'
          }
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
