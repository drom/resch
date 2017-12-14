'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const update = require('immutability-helper');
const chai = require('chai');
const resch = require('../lib/');

const arrayTable = require('../lib/array-table');
const objectTable = require('../lib/object-table');
const stringTable = require('../lib/string-table');
const numberTable = require('../lib/number-table');

const schema = require('../src/table-schema');
const data = require('../src/table-data');

const expect = chai.expect;

describe('basic', function () {
    const $ = React.createElement;

    const desc = Object.assign({
        'array_table': arrayTable,
        'object_table': objectTable,
        'string_table': stringTable,
        'number_table': numberTable
    }, resch);

    desc.oneOf = resch.__oneOf(schema => data => (
        data &&
        data.kind &&
        data.kind === schema.properties.kind.enum[0]
    ));

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
                        focus: this.state.focus
                    })
                )
            );
        }
    }

    it('t1', function (done) {
        const res = ReactDOMServer.renderToStaticMarkup($(App, { data: data }));
        expect(res).to.be.a('string');
        done();
    });

});

/* eslint-env mocha */
