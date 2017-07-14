'use strict';

const React = require('react')
    , ReactDOM = require('react-dom')
    , update = require('immutability-helper')
    , reGenForm = require('../form')
    , reGenString = require('../string')
    , reGenNumber = require('../number')
    , reGenInteger = require('../integer')
    , reGenObject = require('../object')
    , reGenArray = require('../array')
    ;

const $ = React.createElement;

const schema = {
    type: 'object', title: 'o1',
    properties: {
        years: {
            type: 'object', title: 'years',
            properties: {
                from: {
                    type: 'integer', title: 'from'
                },
                to: {
                    type: 'number', title: 'to'
                }
            }
        },
        contry: {
            type: 'string', title: 'contry'
        },
        bands: {
            type: 'array', title: 'The Bands',
            items: {
                type: 'object', title: 'band data',
                properties: {
                    name: { type: 'string', title: 'band name' },
                    members: {
                        type: 'array', title: 'band members',
                        items: {
                            type: 'object', title: 'band member',
                            properties: {
                                first: {
                                    type: 'string', title: 'first name'
                                },
                                last: {
                                    type: 'string', title: 'last name'
                                },
                                tools: {
                                    type: 'array', title: 'tools',
                                    items: {
                                        type: 'string', title: 'instrument'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

const data = {
    years: {
        from: 1961,
        to: 1971
    },
    contry: 'UK',
    bands: [
        {
            name: 'The Beatles',
            members: [
                { first: 'John', last: 'Lennon', tools: ['Rhythm guitar'] },
                { first: 'Paul', last: 'McCartney', tools: ['Bass', 'Piano'] },
                { first: 'George', last: 'Harrison', tools: ['Lead guitar'] },
                { first: 'Ringo', last: 'Starr', tools: ['Drums'] }
            ]
        }
    ]
};

const genForm = reGenForm(React)({
    array: reGenArray,
    string: reGenString,
    number: reGenNumber,
    integer: reGenInteger,
    object: reGenObject
});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.data };
        this.updateData = this.updateData.bind(this);

        this.Form = genForm({
            schema: schema,
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
    $(App, { data: data }),
    document.getElementById('root')
);

/* eslint-env browser */
