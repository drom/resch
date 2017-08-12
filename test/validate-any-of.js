'use strict';

const React = require('react')
    , ReactDOMServer = require('react-dom/server')
    , chai = require('chai')
    , resch = require('../lib/')
    ;

const expect = chai.expect;

describe('anyOf errors', () => {
    const $ = React.createElement;
    const desc = Object.assign({}, resch);
    const genForm = resch.__form(React)(desc);

    [{}]
        .forEach(data => {
            it(JSON.stringify(data), done => {
                const Form = genForm({ schema: { /* eslint quotes: [1, "single"] */
                    "type": 'object', "title": "obj",
                    "properties": {
                        "a": { "title": "a", "enum": [false, true] },
                        "b": { "title": "b", "enum": [0, 1] },
                        "c": { "title": "c", "enum": ["a", "b"] }
                    },
                    "anyOf": [
                        { required: ["a"], "properties": { "a": { "enum": [true] }}},
                        { required: ["b"],"properties": { "b": { "enum": [1] } }},
                        { required: ["c"],"properties": { "c": { "enum": ["b"] }}}
                    ]
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
