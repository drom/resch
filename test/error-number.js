'use strict';

const React = require('react')
    , ReactDOMServer = require('react-dom/server')
    , chai = require('chai')
    , resch = require('../lib/')
    ;

const expect = chai.expect;

describe('number errors', () => {
    const $ = React.createElement;
    const desc = Object.assign({}, resch);
    const genForm = resch.__form(React)(desc);

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
