'use strict';

const React = require('react')
    , ReactDOMServer = require('react-dom/server')
    , chai = require('chai')
    , resch = require('../lib/')
    ;

const expect = chai.expect;

[undefined, null, 0, 42, '', '*', {}, [], true, false].forEach(data => {
    describe('data: ' + JSON.stringify(data) + ' with type: ', () => {
        const $ = React.createElement;
        const desc = Object.assign({}, resch);
        const genForm = resch.__form(React)(desc);

        'null boolean string number integer object array'.split(' ')
            .forEach(type => {
                it(type, done => {
                    const Form = genForm({ schema: {
                        type: type
                    }});
                    const res = ReactDOMServer.renderToStaticMarkup($(Form, {
                        data: data
                    }));
                    expect(res).to.be.a('string');
                    done();
                });
            });

    });
});

/* eslint-env mocha */
