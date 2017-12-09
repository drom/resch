'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const update = require('immutability-helper');
const resch = require('../lib/');
const arrayTable = require('../lib/array-table');
const objectTable = require('../lib/object-table');
const stringTable = require('../lib/string-table');
const numberTable = require('../lib/number-table');

const schema = {
    type: 'array',
    title: 'table 1',
    widget: 'table',
    items: {
        type: 'object',
        widget: 'table',
        properties: {
            num:   {type: 'number', widget: 'table', title: '#'},
            first: {type: 'string', widget: 'table', title: 'First Name'},
            last:  {type: 'string', widget: 'table', title: 'Last Name'},
            user:  {type: 'string', widget: 'table', title: 'Username'}
        }
    }
};

const data = [
    {num: 1, first: 'Mark',  last: 'Otto',     user: '@mdo'},
    {num: 2, first: 'Jacob', last: 'Thornton', user: '@fat'},
    {num: 3, first: 'Larry', last: 'the Bird', user: '@twitter'}
];

const $ = React.createElement;

const desc = Object.assign({
    'array_table': arrayTable,
    'object_table': objectTable,
    'string_table': stringTable,
    'number_table': numberTable
}, resch);

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
            schema: schema,
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
    $(App, { data: data }),
    document.getElementById('root')
);

/* eslint-env browser */
