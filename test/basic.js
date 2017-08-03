'use strict';

const React = require('react')
    , ReactDOMServer = require('react-dom/server')
    , update = require('immutability-helper')
    , chai = require('chai')
    , reGenForm = require('../form')

    , reGenArray = require('../array')
    , reGenAllOf = require('../all-of')
    , reGenAnyOf = require('../any-of')
    , reGenBoolean = require('../boolean')
    , reGenEnum = require('../enum')
    , reGenInteger = require('../integer')
    , reGenNull = require('../null')
    , reGenNumber = require('../number')
    , reGenObject = require('../object')
    , reGenOneOf = require('../one-of')
    , reGenString = require('../string')

    , rockSchema = require('../src/rock-schema')
    , rockData = require('../src/rock-data')
    ;

const expect = chai.expect;

describe('basic', function () {
    const $ = React.createElement;

    const genForm = reGenForm(React)({
        array: reGenArray,
        allOf: reGenAllOf,
        anyOf: reGenAnyOf,
        boolean: reGenBoolean,
        enum: reGenEnum,
        enum_label: reGenEnum,
        integer: reGenInteger,
        null: reGenNull,
        number: reGenNumber,
        object: reGenObject,
        oneOf: reGenOneOf(schema => data =>
            (schema.properties.kind.enum[0] === data.kind)),
        string: reGenString
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
