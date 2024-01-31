'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const chai = require('chai');

const resch = require('../lib/');
const reObjAdditional = require('../lib/object-additional');

const expect = chai.expect;

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
        properties: {},
        additionalProperties: null
      }
    }
  }]
};

m012.oneOf[1].properties.properties.additionalProperties = m012;

const t0 = {};

const t1 = {
  type: 'string'
};

const t2 = {
  type: 'object',
  properties: {}
};

// const t42 = {
//     type: 'object',
//     properties: {
//         name:      {type: 'string'},
//         email:     {type: 'string'},
//         address:   {type: 'string'},
//         telephone: {type: 'string'}
//     }
// };


describe('meta', () => {
  const $ = React.createElement;
  const desc = Object.assign({}, resch);
  desc.object = reObjAdditional;
  desc.oneOf = resch.__oneOf(sch => dat =>
    (sch.properties.type.enum[0] === dat.type)
  );

  const genForm = resch.__form(React)(desc);

  it('t0', done => {
    const Form = genForm( {schema: m012, path: []} );
    const res = ReactDOMServer.renderToStaticMarkup($(Form, {
      data: t0
    }));
    expect(res).to.be.a('string');
    done();
  });

  it('t1', done => {
    const Form = genForm( {schema: m012, path: []} );
    const res = ReactDOMServer.renderToStaticMarkup($(Form, {
      data: t1
    }));
    expect(res).to.be.a('string');
    done();
  });

  it('t2', done => {
    const Form = genForm( {schema: m012, path: []} );
    const res = ReactDOMServer.renderToStaticMarkup($(Form, {
      data: t2
    }));
    expect(res).to.be.a('string');
    done();
  });
});

/*
{
   type: [   v]
   title: [_____]
   properties:
     - [__key__] : { type: [    v] }
     +
}
*/

/* eslint-env mocha */
