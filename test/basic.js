'use strict';

const React = require('react')
    , ReactDOMServer = require('react-dom/server')
    , update = require('immutability-helper')
    , chai = require('chai')
    , resch = require('../lib/')
    , rockSchema = require('../src/rock-schema')
    , rockData = require('../src/rock-data')
    ;

const expect = chai.expect;

describe('basic', function () {
    const $ = React.createElement;

    const desc = Object.assign({}, resch);

    desc.oneOf = resch.__oneOf(schema => data =>
        (schema.properties.kind.enum[0] === data.kind)
    );

    const genForm = resch.__form(React)(desc);

    class App extends React.Component {

        constructor(props) {
            super(props);
            this.state = { data: props.data };
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
