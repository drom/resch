'use strict';

const React = require('react')
    , ReactDOMServer = require('react-dom/server')
    , chai = require('chai')
    , resch = require('../lib/')
    ;

const expect = chai.expect;

describe('string errors', () => {
    const $ = React.createElement;
    const desc = Object.assign({}, resch);
    const genForm = resch.__form(React)(desc);

    'tooShort normalNormal tooooooooooLong wrong-Pattern'.split(' ')
        .forEach(data => {
            it(data, done => {
                const Form = genForm({ schema: {
                    type: 'string',
                    minLength: 9,
                    maxLength: 14,
                    pattern: '^[a-zA-Z]$'
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
