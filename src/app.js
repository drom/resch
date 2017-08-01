'use strict';

const React = require('react')
    , ReactDOM = require('react-dom')
    , update = require('immutability-helper')
    , reGenForm = require('../form')
    , reGenNull = require('../null')
    , reGenString = require('../string')
    , reGenNumber = require('../number')
    , reGenBoolean = require('../boolean')
    , reGenInteger = require('../integer')
    , reGenObject = require('../object')
    , reGenArray = require('../array')
    , rockSchema = require('./rock-schema')
    , rockData = require('./rock-data')
    ;

const $ = React.createElement;

const genForm = reGenForm(React)({
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

ReactDOM.render(
    $(App, { data: rockData }),
    document.getElementById('root')
);

/* eslint-env browser */
