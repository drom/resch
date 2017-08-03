'use strict';

const React = require('react')
    , ReactDOM = require('react-dom')
    , update = require('immutability-helper')
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

    , rockSchema = require('./rock-schema')
    , rockData = require('./rock-data')
    ;

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
    oneOf: reGenOneOf,
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

ReactDOM.render(
    $(App, { data: rockData }),
    document.getElementById('root')
);

/* eslint-env browser */
