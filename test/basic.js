'use strict';

const React = require('react')
    , ReactDOMServer = require('react-dom/server')
    , update = require('immutability-helper')
    , chai = require('chai')
    , reGenForm = require('../form')
    , reGenNull = require('../null')
    , reGenString = require('../string')
    , reGenNumber = require('../number')
    , reGenBoolean = require('../boolean')
    , reGenInteger = require('../integer')
    , reGenObject = require('../object')
    , reGenArray = require('../array')
    , reGenEnum = require('../enum')
    , rockSchema = require('../src/rock-schema')
    , rockData = require('../src/rock-data')
    ;

const expect = chai.expect;

describe('basic', function () {
    const $ = React.createElement;

    const genForm = reGenForm(React)({
        enum: reGenEnum,
        array: reGenArray,
        string: reGenString,
        number: reGenNumber,
        boolean: reGenBoolean,
        integer: reGenInteger,
        null: reGenNull,
        object: reGenObject
    });

    class App extends React.Component {

        constructor(props) {
            super(props);
            this.state = { data: props.data };
            this.updateData = this.updateData.bind(this);

            this.Form = genForm({
                schema: rockSchema,
                path: [],
                updateData: this.updateData
            });
        }

        updateData (spec) {
            this.setState(function (state) {
                state.data = update(state.data, spec);
                return state;
            });
        }

        render () {
            return (
                $('div', {},
                    $(this.Form, { data: this.state.data })
                )
            );
        }
    }

    it('t1', function (done) {
        const res = ReactDOMServer.renderToStaticMarkup($(App, { data: rockData }));
        expect(res).to.be.a('string');
        done();
    });

});

/* eslint-env mocha */
