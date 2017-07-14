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
    type: 'object', title: 'Favorites',
    properties: {
        years: {
            type: 'object', title: 'Years',
            properties: {
                from: {
                    type: 'integer', title: 'From'
                },
                to: {
                    type: 'integer', title: 'To'
                }
            }
        },
        contry: {
            type: 'string', title: 'Country'
        },
        bands: {
            type: 'array', title: 'The Bands',
            items: {
                type: 'object', title: 'Band data',
                properties: {
                    name: { type: 'string', title: 'Band name' },
                    members: {
                        type: 'array', title: 'Band members',
                        items: {
                            type: 'object', title: 'Band member',
                            properties: {
                                first: {
                                    type: 'string',
                                    title: 'First name',
                                    pattern: '^[a-zA-Z]+$'
                                },
                                last: {
                                    type: 'string', title: 'Last name'
                                },
                                tools: {
                                    type: 'array', title: 'Tools',
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
