'use strict';

const React = require('react')
    , ReactDOM = require('react-dom')
    , update = require('immutability-helper')
    , reObjectAdditional = require('../lib/object-additional')
    , resch = require('../lib/')
    , rockSchema = require('./default-schema')
    ;

update.extend('$auto', function(value, object) {
    return object ?
        update(object, value):
        update({}, value);
});

const t3 = {
    type: 'object',
    properties: {
        abc: {type: 'string'}
    }
};


const $ = React.createElement;

const desc = Object.assign({}, resch);
desc.object = reObjectAdditional;

desc.oneOf = resch.__oneOf(schema => data =>
    (data && schema.properties.type.enum[0] === data.type)
);

const genForm = resch.__form(React)(desc);

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            focus: undefined
        };
        this.updateState = this.updateState.bind(this);

        this.Form = genForm({
            schema: rockSchema,
            path: [],
            updateState: this.updateState
        });
    }

    updateState (spec) {
        this.setState(function (state) {
            return update(state, spec);
        });
    }

    render () {
        return (
            $('div', {},
                $(this.Form, {
                    data: this.state.data,
                    focus: this.state.focus,
                    readonly: this.state.data.readonly
                })
            )
        );
    }
}

ReactDOM.render(
    $(App, { data: t3 }),
    document.getElementById('root')
);

/* eslint-env browser */
