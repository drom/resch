'use strict';

const React = require('react')
    , ReactDOM = require('react-dom')
    , update = require('immutability-helper')
    , resch = require('../lib/')
    // , rockSchema = require('./rock-schema')
    // , rockData = require('./rock-data')
    ;

// const m1 = {
//     type: 'object',
//     properties: {
//         type: {
//             title: 'type:',
//             type: 'string',
//             enum: ['string']
//         }
//     }
// };
//
// const m2 = {
//     type: 'object',
//     properties: {
//         type: {
//             title: 'type:',
//             type: 'string',
//             enum: ['object']
//         },
//         properties: {
//             title: 'properties:',
//             type: 'object',
//             properties: {}
//         }
//     }
// };

const m012 = {
    type: 'object',
    oneOf:[{
        title: 'string',
        properties: {
            type: {
                title: 'type:',
                type: 'string',
                enum: ['string']
            }
        }
    }, {
        title: 'object',
        properties: {
            type: {
                title: 'type:',
                type: 'string',
                enum: ['object']
            },
            properties: {
                title: 'properties:',
                type: 'object',
                additionalProperties: null
            }
        }
    }]
};

m012.oneOf[1].properties.properties.additionalProperties = m012;

// const t0 = {};

// const t1 = {
//     type: 'string'
// };

// const t2 = {
//     type: 'object',
//     properties: {}
// };

const t3 = {
    type: 'object',
    properties: {
        abc: {type: 'string'}
    }
};


const $ = React.createElement;

const desc = Object.assign({}, resch);

desc.oneOf = resch.__oneOf(schema => data =>
    (schema.properties.type.enum[0] === data.type)
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
            schema: m012,
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
