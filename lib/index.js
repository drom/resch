'use strict';

const reGenForm = require('./form')
    , reGenArray = require('./array')
    , reGenBoolean = require('./boolean')
    , reGenEnum = require('./enum')
    , reGenNull = require('./null')
    , reGenNumber = require('./number')
    , reGenObject = require('./object')
    , reGenOneOf = require('./one-of')
    , reGenString = require('./string')
    ;

module.exports = {
    __form: reGenForm,
    array: reGenArray,
    boolean: reGenBoolean,
    enum: reGenEnum,
    integer: reGenNumber,
    null: reGenNull,
    number: reGenNumber,
    object: reGenObject,
    __oneOf: reGenOneOf,
    string: reGenString
};
