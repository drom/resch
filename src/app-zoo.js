'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const update = require('immutability-helper');
const resch = require('../lib/');

const zooSchema = {
    type: 'object', title: 'zoo',
    properties: {
        pi: {
            type: 'number', title: 'π',
            minimum: 3,
            maximum: 4
        },
        '42': {
            type: 'integer', title: 'The Answer to the Ultimate Question of Life, The Universe, and Everything',
            minimum: -42,
            maximum: 100
        },
        poster: {
            type: 'string', title: 'motivational poster'
        }
    }
};

const zooData = {
    pi: 3.141592653589793,
    42: 42,
    poster: 'Keep Calm and Carry On'
};

const $ = React.createElement;

const desc = Object.assign({}, resch);

desc.oneOf = resch.__oneOf(schema => data =>
    (schema.properties.kind.enum[0] === data.kind)
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
            schema: zooSchema,
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
    $(App, { data: zooData }),
    document.getElementById('root')
);

/* eslint-env browser */
